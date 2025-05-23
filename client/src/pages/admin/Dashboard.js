// client/src/pages/BoothAdmin.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BoothAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 mb-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">BOOTH ADMIN Dashboard</h1>
        <div className="flex flex-col gap-4">
          <Link to="/admin/register-driver">
            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-800 transition">Manual Driver Registration</button>
          </Link>
          <Link to="/admin/drivers">
            <button className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-800 transition">View All Drivers</button>
          </Link>
          <Link to="/admin/add-user">
            <button className="w-full bg-orange-500 text-white font-semibold py-3 rounded hover:bg-orange-700 transition">ADD A USER</button>
          </Link>
          <Link to="/admin/view-users">
            <button className="w-full bg-purple-600 text-white font-semibold py-3 rounded hover:bg-purple-800 transition">View Current Users/Customers Registered</button>
          </Link>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-2">&copy; 2025 GANTAVYAM. All rights reserved.</div>
    </div>
  );
};

export default BoothAdmin;