import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Welcome to GANTAVYAM</h1>
      <div className="flex gap-8 mb-8">
        <button
          className="px-8 py-4 text-lg font-semibold rounded bg-blue-600 text-white hover:bg-blue-800 transition"
          onClick={() => navigate('/driver/login')}
        >
          I am a Driver
        </button>
        <button
          className="px-8 py-4 text-lg font-semibold rounded bg-green-600 text-white hover:bg-green-800 transition"
          onClick={() => navigate('/user/login')}
        >
          I am a User
        </button>
      </div>
      <div className="mt-4 text-gray-500">
        <small>
          <a href="/admin" className="hover:underline hover:text-blue-700">Admin Login</a>
        </small>
      </div>
    </div>
  );
};

export default LandingPage; 