import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Warning from '../Components/Warning';
import axios from 'axios';
import { useAuth } from '../customHooks/useAuth';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [warning, setWarning] = useState({ status: '', message: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setWarning({ status: '', message: '' });

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/verifyUser',
        inputs,
      );

      if (response.data.status === 'success') {
        login(response.data.user_info, response.data.token);
        setWarning({
          status: 'success',
          message: 'Successfully Logged In! Redirecting...',
        });
        setTimeout(() => {
          navigate('/dashboard');
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Cannot connect to the server!';
      setWarning({ status: 'error', message: errorMessage });
    }
  };
  return (
    <section
      id="login"
      className="flex grow justify-center items-center w-full p-4"
    >
      <div className="flex flex-col bg-white shadow-xl border border-gray-100 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome back,
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Please sign in to continue using our services.
          </p>
        </div>
        <Warning status={warning.status} message={warning.message} />
        <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="jkennedy"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md mt-2"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
