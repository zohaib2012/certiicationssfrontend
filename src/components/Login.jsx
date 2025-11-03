import React, { useState } from 'react';
import { useLoginUserMutation } from '../redux/authapislice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password }).unwrap();
      let token=result.logintoken
      localStorage.setItem('Token',token)
      alert('Login successfully ');
      navigate('/')
      console.log('User:', result.user);
    } catch (err) {
      alert(err?.data?.message || 'An error occurred while logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Admin Dashboard Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600 bg-blue-50"
              placeholder="Enter your username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600 bg-blue-50"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md font-semibold transition-colors"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-3">
            {error.data?.message || 'Login failed'}
          </p>
        )}
      </div>
    </div>
  );
}
