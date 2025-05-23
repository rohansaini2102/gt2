// client/src/pages/DriverSignup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { driverSignup } from '../../services/api';

const DriverSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNo: '',
    aadhaarNo: '',
    vehicleNo: '',
    // Bank Details
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    accountHolderName: '',
    // License and Certificates
    drivingLicenseNo: '',
    permitNo: '',
    fitnessCertificateNo: '',
    insurancePolicyNo: '',
    password: '',
    confirmPassword: ''
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
  const [activeSection, setActiveSection] = useState('personal');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('mobileNo', formData.mobileNo);
      submitData.append('aadhaarNo', formData.aadhaarNo);
      submitData.append('vehicleNo', formData.vehicleNo);
      const bankDetails = {
        bankName: formData.bankName,
        ifscCode: formData.ifscCode,
        accountNumber: formData.accountNumber,
        accountHolderName: formData.accountHolderName
      };
      submitData.append('bankDetails', JSON.stringify(bankDetails));
      submitData.append('drivingLicenseNo', formData.drivingLicenseNo);
      submitData.append('permitNo', formData.permitNo);
      submitData.append('fitnessCertificateNo', formData.fitnessCertificateNo);
      submitData.append('insurancePolicyNo', formData.insurancePolicyNo);
      submitData.append('password', formData.password);
      Object.keys(files).forEach(key => {
        if (files[key]) {
          submitData.append(key, files[key]);
        }
      });
      await driverSignup(submitData);
      setLoading(false);
      alert('Signup successful! Please login.');
      navigate('/driver/login');
    } catch (err) {
      setError(err.error || 'Failed to register');
      setLoading(false);
    }
  };

  const changeSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mb-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Welcome to GANTAVYAM</h1>
          <h2 className="text-xl font-semibold text-orange-500">Driver Signup</h2>
          <p className="mt-2 text-blue-600 font-semibold">
            <Link to="/driver/login" className="hover:underline">Already registered? Login</Link>
          </p>
        </div>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 border-l-4 border-red-500 text-sm">{error}</div>}
        <div className="flex justify-between mb-8">
          <div className={`flex-1 text-center py-2 rounded-l-lg ${activeSection === 'personal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} cursor-pointer`} onClick={() => changeSection('personal')}>Personal Info</div>
          <div className={`flex-1 text-center py-2 ${activeSection === 'bank' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} cursor-pointer`} onClick={() => changeSection('bank')}>Bank Details</div>
          <div className={`flex-1 text-center py-2 ${activeSection === 'license' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} cursor-pointer`} onClick={() => changeSection('license')}>Licenses</div>
          <div className={`flex-1 text-center py-2 rounded-r-lg ${activeSection === 'security' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} cursor-pointer`} onClick={() => changeSection('security')}>Security</div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Personal Information Section */}
          <div className={activeSection === 'personal' ? '' : 'hidden'}>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
                <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required placeholder="Enter your mobile number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Aadhaar Number</label>
                <input type="text" name="aadhaarNo" value={formData.aadhaarNo} onChange={handleChange} required placeholder="Enter your 12-digit Aadhaar number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Aadhaar Photo</label>
                <input type="file" name="aadhaarPhoto" onChange={handleFileChange} required className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Vehicle Number</label>
                <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} required placeholder="Enter your vehicle number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Registration Certificate Photo</label>
                <input type="file" name="registrationCertificatePhoto" onChange={handleFileChange} required className="w-full" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={() => changeSection('bank')} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition">Next</button>
            </div>
          </div>
          {/* Bank Details Section */}
          <div className={activeSection === 'bank' ? '' : 'hidden'}>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Bank Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Bank Name</label>
                <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required placeholder="Enter your bank name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">IFSC Code</label>
                <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required placeholder="Enter IFSC code" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Account Number</label>
                <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required placeholder="Enter account number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Account Holder Name</label>
                <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required placeholder="Enter account holder name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={() => changeSection('personal')} className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Back</button>
              <button type="button" onClick={() => changeSection('license')} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition">Next</button>
            </div>
          </div>
          {/* License and Certificates Section */}
          <div className={activeSection === 'license' ? '' : 'hidden'}>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">License and Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Driving License Number</label>
                <input type="text" name="drivingLicenseNo" value={formData.drivingLicenseNo} onChange={handleChange} required placeholder="Enter driving license number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Driving License Photo</label>
                <input type="file" name="drivingLicensePhoto" onChange={handleFileChange} required className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Permit Number</label>
                <input type="text" name="permitNo" value={formData.permitNo} onChange={handleChange} required placeholder="Enter permit number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Permit Photo</label>
                <input type="file" name="permitPhoto" onChange={handleFileChange} required className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Fitness Certificate Number</label>
                <input type="text" name="fitnessCertificateNo" value={formData.fitnessCertificateNo} onChange={handleChange} required placeholder="Enter fitness certificate number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Fitness Certificate Photo</label>
                <input type="file" name="fitnessCertificatePhoto" onChange={handleFileChange} required className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Insurance Policy Number</label>
                <input type="text" name="insurancePolicyNo" value={formData.insurancePolicyNo} onChange={handleChange} required placeholder="Enter insurance policy number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Insurance Policy Photo</label>
                <input type="file" name="insurancePolicyPhoto" onChange={handleFileChange} required className="w-full" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={() => changeSection('bank')} className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Back</button>
              <button type="button" onClick={() => changeSection('security')} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition">Next</button>
            </div>
          </div>
          {/* Security Section */}
          <div className={activeSection === 'security' ? '' : 'hidden'}>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" placeholder="Create a password (min. 6 characters)" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required minLength="6" placeholder="Confirm your password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={() => changeSection('license')} className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Back</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition disabled:bg-gray-400">
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="text-center text-gray-500 text-xs mt-2">&copy; 2025 GANTAVYAM. All rights reserved.</div>
    </div>
  );
};

export default DriverSignup;