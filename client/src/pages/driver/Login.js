// client/src/pages/DriverLogin.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const DriverLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNo: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    mobileNo: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [resetMessage, setResetMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!formData.mobileNo || !formData.password) {
      setError('Please enter both mobile number and password.');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/drivers/login', formData);
      if (res.data.token) {
        localStorage.setItem('driverToken', res.data.token);
        if (res.data.driver) {
          localStorage.setItem('driver', JSON.stringify(res.data.driver));
        } else if (res.data.data) {
          localStorage.setItem('driver', JSON.stringify(res.data.data));
        }
        setLoading(false);
        navigate('/driver/dashboard');
      } else {
        throw new Error('No token received from server');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message === 'Network Error') {
        setError('Network error: Please check your connection or server.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResetMessage('');
    if (!forgotPasswordData.mobileNo || !forgotPasswordData.newPassword || !forgotPasswordData.confirmPassword) {
      setResetMessage('Please fill all fields.');
      setLoading(false);
      return;
    }
    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      setResetMessage('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/drivers/reset-password', {
        mobileNo: forgotPasswordData.mobileNo,
        newPassword: forgotPasswordData.newPassword
      });
      setResetMessage('Password reset successful! Please login with your new password.');
      setShowForgotPassword(false);
      setForgotPasswordData({ mobileNo: '', newPassword: '', confirmPassword: '' });
      setFormData({ ...formData, mobileNo: forgotPasswordData.mobileNo });
    } catch (err) {
      setResetMessage(
        err.response?.data?.error || 
        'Failed to reset password. Please check your mobile number.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mb-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">GANTAVYAM</h1>
          <h2 className="text-xl font-semibold text-orange-500">Driver Login</h2>
        </div>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 border-l-4 border-red-500 text-sm">{error}</div>}
        {resetMessage && (
          <div className={`px-4 py-2 rounded mb-4 border-l-4 text-sm ${resetMessage.includes('successful') ? 'bg-green-100 text-green-700 border-green-500' : 'bg-red-100 text-red-700 border-red-500'}`}>{resetMessage}</div>
        )}
        {!showForgotPassword ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="mobileNo" className="block text-gray-700 font-medium mb-1">Mobile Number</label>
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  placeholder="Enter your registered mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm mb-2"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-800 transition disabled:bg-gray-400 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="loader border-2 border-t-2 border-t-white border-blue-200 rounded-full w-5 h-5 animate-spin mr-2"></span>
                ) : (
                  'Login'
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">New driver?</p>
              <Link to="/driver/signup" className="text-blue-600 font-semibold hover:underline">Create Account</Link>
            </div>
          </>
        ) : (
          <div className="animate-fadeIn">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Reset Password</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="reset-mobile" className="block text-gray-700 font-medium mb-1">Mobile Number</label>
                <input
                  type="text"
                  id="reset-mobile"
                  name="mobileNo"
                  value={forgotPasswordData.mobileNo}
                  onChange={handleForgotPasswordChange}
                  required
                  placeholder="Enter your registered mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={forgotPasswordData.newPassword}
                  onChange={handleForgotPasswordChange}
                  required
                  placeholder="Create a new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={forgotPasswordData.confirmPassword}
                  onChange={handleForgotPasswordChange}
                  required
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-between gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loader border-2 border-t-2 border-t-white border-blue-200 rounded-full w-5 h-5 animate-spin mr-2"></span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="text-center text-gray-500 text-xs mt-2">&copy; 2025 GANTAVYAM. All rights reserved.</div>
    </div>
  );
};

export default DriverLogin;