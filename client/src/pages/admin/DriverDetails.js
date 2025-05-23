// client/src/pages/admin/DriverDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDriverById } from '../../services/api';

const DriverDetails = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await getDriverById(id);
        setDriver(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching driver:', err);
        setError('Failed to fetch driver details');
        setLoading(false);
      }
    };

    fetchDriver();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  if (!driver) return <div className="flex items-center justify-center min-h-screen">Driver not found</div>;

  const renderDocument = (title, base64Data) => {
    if (!base64Data) return null;
    return (
      <div className="mb-6">
        <p className="font-semibold mb-2">{title}:</p>
        <img
          src={base64Data}
          alt={title}
          className="max-w-xs max-h-72 border border-gray-300 rounded p-2 object-contain bg-white"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 mb-4">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Driver Details</h1>
        <Link to="/admin/drivers" className="text-blue-600 hover:underline mb-4 inline-block">Back to Drivers List</Link>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">{driver.fullName}</h2>
          <p><span className="font-semibold">Mobile:</span> {driver.mobileNo}</p>
          <p><span className="font-semibold">Aadhaar No:</span> {driver.aadhaarNo}</p>
          <p><span className="font-semibold">Vehicle No:</span> {driver.vehicleNo}</p>
          <h3 className="mt-4 font-semibold">Bank Details</h3>
          <p><span className="font-semibold">Account Holder:</span> {driver.bankDetails?.accountHolderName}</p>
          <p><span className="font-semibold">Account Number:</span> {driver.bankDetails?.accountNumber}</p>
          <p><span className="font-semibold">IFSC Code:</span> {driver.bankDetails?.ifscCode}</p>
          <p><span className="font-semibold">Bank Name:</span> {driver.bankDetails?.bankName}</p>
          <h3 className="mt-4 font-semibold">License Information</h3>
          <p><span className="font-semibold">Driving License No:</span> {driver.drivingLicenseNo}</p>
          <p><span className="font-semibold">Permit No:</span> {driver.permitNo}</p>
          <p><span className="font-semibold">Fitness Certificate No:</span> {driver.fitnessCertificateNo}</p>
          <p><span className="font-semibold">Insurance Policy No:</span> {driver.insurancePolicyNo}</p>
        </div>
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDocument('Aadhaar Card', driver.aadhaarPhoto)}
          {renderDocument('Registration Certificate', driver.registrationCertificatePhoto)}
          {renderDocument('Driving License', driver.drivingLicensePhoto)}
          {renderDocument('Permit', driver.permitPhoto)}
          {renderDocument('Fitness Certificate', driver.fitnessCertificatePhoto)}
          {renderDocument('Insurance Policy', driver.insurancePolicyPhoto)}
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-2">&copy; 2025 GANTAVYAM. All rights reserved.</div>
    </div>
  );
};

export default DriverDetails;