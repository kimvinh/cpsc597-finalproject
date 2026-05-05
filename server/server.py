import os
import pandas as pd
import joblib

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from collections import Counter

from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'secret-key-for-ids-app'
jwt = JWTManager(app)
CORS(app)

UPLOAD_FOLDER = './traffic_files'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'csv', 'pcap'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

## Connect MongoDB Database
connect = MongoClient('mongodb://localhost:27017/')
db = connect['ids_database']
users = db['users']

# Load dataset files
preprocessor = joblib.load('../dataset/preprocessor.pkl')
xgboost_model = joblib.load('../dataset/xgboost_model.pkl')
label_encoder = joblib.load('../dataset/label_encoder.pkl')

@app.route('/createUser', methods=['POST'])
def createUser():
	try:
		user_data = request.json;
		user_data.pop("confirmPassword")

		if users.find_one({'username': user_data.get('username')}):
			return jsonify({'status': 'error', 'message': 'Username already exists.'}), 409
							
		if users.find_one({'email': user_data.get('email')}):
			return jsonify({'status': 'error', 'message': 'Email already registered.'}), 409
		
		user_data['password'] = generate_password_hash(user_data['password'])
		users.insert_one(user_data)
		return jsonify({'status': 'success', 'message': 'Account created successfully!'}), 201
	except Exception as event:
		return jsonify({'status': 'error', 'message': 'An error occurred during registration.'}), 500

@app.route('/verifyUser', methods=['POST'])
def verifyUser():
	try:
		user_data = request.json;
		user = users.find_one({'username': user_data['username']})
		if not user or not check_password_hash(user['password'], user_data['password']):
			return jsonify({'status': 'error', 'message': 'Invalid username or password'}), 401
		access_token = create_access_token(identity=user['username'])
		user_info = {
			'firstName': user.get('firstName'),
			'lastName': user.get('lastName'),
			'username': user.get('username')
		}
		return jsonify({'status': 'success', 'message': 'Successfully Login!', 'token': access_token, 'user_info': user_info}), 200
	except Exception as event:
		return jsonify({'status': 'error', 'message': 'An error occurred during registration.'}), 500

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload_file', methods=['POST'])
def upload_file():
	try:
		if 'traffic_file' not in request.files:
			return jsonify({'status': 'error', 'message': 'No "traffic_file" part found in the request.'}), 400
		file = request.files['traffic_file']
		if file.filename == '':
			return jsonify({'status': 'error', 'message': 'No file selected in the request.'}), 400
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			return jsonify({'status': 'success', 'message': 'Successfully uploaded the traffic file.'}), 200
		return jsonify({'status': 'error', 'message': 'Invalid file type. Please upload your .csv or .pcap file again.'}), 400
	except Exception as event:
		return jsonify({'status': 'error', 'message': 'An error occurred during uploading file.'}), 500

@app.route('/analyze_traffics', methods=['POST'])
def analyze_traffics():
	try:
		file = request.json;
		filename = file.get('filename');
		filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
		if not os.path.exists(filepath):
			return jsonify({ 'status': 'error', 'message': 'File does not exist in the system.'}), 404
		dataframe = pd.read_csv(filepath);
		dataframe.pop('label');
		dataframe.pop('attack_cat');
		X_processed = preprocessor.transform(dataframe)
		X_numerical_predictions = xgboost_model.predict(X_processed)
		X_text_predictions = label_encoder.inverse_transform(X_numerical_predictions)
		detailed_results = []
		for index, pred in enumerate(X_text_predictions):
			record = {
				"id": index + 1,
				"protocol": str(dataframe['proto'].iloc[index]) if 'proto' in dataframe.columns else "N/A",
				"prediction": pred
			}
			detailed_results.append(record);
		attack_counts = Counter(X_text_predictions)
		return jsonify({'status': 'success', 
				  	'message': 'Network Traffic Analysis Completed!', 
					'results': {'numerical_data': X_numerical_predictions.tolist(), 'text_data': X_text_predictions.tolist(), 'summary': attack_counts, 'details': detailed_results}}), 200
	except Exception as event:
		return jsonify({'status': 'error', 'message': 'An error occurred during analyzing the network traffic.'}), 500

if __name__ == '__main__':
	app.run(debug=True)