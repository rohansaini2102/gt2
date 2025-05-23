// client/src/pages/driver/Registration.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerDriver } from '../../services/api';

const DriverRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNo: '',
    aadhaarNo: '',
    vehicleNo: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    drivingLicenseNo: '',
    permitNo: '',
    fitnessCertificateNo: '',
    insurancePolicyNo: ''
  });
  
  const [files, setFiles] = useState({
    aadhaarPhoto: null,
    registrationCertificatePhoto: null,
    drivingLicensePhoto: null,
    permitPhoto: null,
    fitnessCertificatePhoto: null,
    insurancePolicyPhoto: null
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      Object.keys(files).forEach(key => {
        if (files[key]) {
          submitData.append(key, files[key]);
        }
      });
      await registerDriver(submitData);
      setLoading(false);
      alert('Driver registered successfully!');
      navigate('/admin/drivers');
    } catch (err) {
      setError(err.error || 'Failed to register driver');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mb-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Manual Driver Registration</h1>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 border-l-4 border-red-500 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
            <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Aadhaar Number</label>
            <input type="text" name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Aadhaar Photo</label>
            <input type="file" name="aadhaarPhoto" onChange={handleFileChange} required className="w-full" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Vehicle Number</label>
            <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Registration Certificate Photo</label>
            <input type="file" name="registrationCertificatePhoto" onChange={handleFileChange} required className="w-full" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-blue-700 mt-6 mb-2">Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Account Holder Name</label>
            <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Account Number</label>
            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">IFSC Code</label>
            <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bank Name</label>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-blue-700 mt-6 mb-2">License & Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Driving License Number</label>
            <input type="text" name="drivingLicenseNo" value={formData.drivingLicenseNo} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Driving License Photo</label>
            <input type="file" name="drivingLicensePhoto" onChange={handleFileChange} required className="w-full" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Permit Number</label>
            <input type="text" name="permitNo" value={formData.permitNo} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Permit Photo</label>
            <input type="file" name="permitPhoto" onChange={handleFileChange} required className="w-full" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Fitness Certificate Number</label>
            <input type="text" name="fitnessCertificateNo" value={formData.fitnessCertificateNo} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Fitness Certificate Photo</label>
            <input type="file" name="fitnessCertificatePhoto" onChange={handleFileChange} required className="w-full" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Insurance Policy Number</label>
            <input type="text" name="insurancePolicyNo" value={formData.insurancePolicyNo} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Insurance Policy Photo</label>
            <input type="file" name="insurancePolicyPhoto" onChange={handleFileChange} required className="w-full" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-800 transition disabled:bg-gray-400 mt-6">
          {loading ? 'Registering...' : 'Register Driver'}
        </button>
      </form>
    </div>
  );
};

export default DriverRegistration;