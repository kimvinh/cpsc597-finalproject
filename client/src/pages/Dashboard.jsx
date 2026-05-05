import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Warning from '../Components/Warning';

const Dashboard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState({ status: '', message: '' });

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setWarning({ status: '', message: '' });
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setWarning({
        status: 'error',
        message: 'Please select a network traffic file to analyze.',
      });
      return;
    }

    setLoading(true);
    setWarning({ status: '', message: '' });

    const formData = new FormData();
    formData.append('traffic_file', file);

    const token = localStorage.getItem('authJWTToken');

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/upload_file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status === 'success') {
        setWarning({
          status: 'success',
          message: 'Successfully Upload The File!',
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to upload the file.';
      setWarning({ status: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeData = async () => {
    const token = localStorage.getItem('authJWTToken');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/analyze_traffics',
        { filename: file.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.status === 'success') {
        navigate('/result', {
          state: { results: response.data.results, filename: file.name },
        });
      }
    } catch (error) {
      const errorMesssage =
        error.response?.data?.message ||
        'Failed to analyze the network traffic';
      setWarning({ status: 'error', message: errorMesssage });
    }
  };

  return (
    <section
      id="dashboard"
      className="flex grow justify-center items-center w-full p-4"
    >
      <div className="flex flex-col grow w-full p-8 items-center">
        <div className="w-full max-w-4xl bg-white shadow-xl border border-gray-100 rounded-2xl p-8">
          <Warning status={warning.status} message={warning.message} />
          <form onSubmit={handleUpload} className="flex flex-col items-center">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                  file
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="border border-gray-600 rounded-lg p-2 bg-gray-50 text-gray-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>

                  {file ? (
                    <p className="text-lg font-semibold text-blue-600">
                      {file.name}
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500 font-semibold">
                        Click to upload or drag and drop your file here
                      </p>
                      <p className="text-xs text-gray-500">
                        (.cvs or .pcap files only)
                      </p>
                      <span className="cursor-pointer mt-3 p-3 border border-green-700 rounded-md font-bold bg-green-600 text-white hover:bg-green-700">
                        Browse from Your Device
                      </span>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept=".csv, .pcap"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer mt-6 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading
                  ? 'Uploading and Checking Your File...'
                  : 'Submit The File'}
              </button>
              {warning.status === 'success' && (
                <button
                  type="button"
                  onClick={handleAnalyzeData}
                  className={
                    'cursor-pointer mt-6 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all bg-blue-600 hover:bg-blue-700'
                  }
                >
                  Analyze The Data
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
