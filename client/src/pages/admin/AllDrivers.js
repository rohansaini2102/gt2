import React, { useEffect, useState } from 'react';
import { admin as adminAPI } from '../../services/api';
import { FiCheckCircle, FiXCircle, FiUser, FiEye, FiTrash2, FiClock } from 'react-icons/fi';
import { SOCKET_URL } from '../../config';

const backendBaseUrl = SOCKET_URL; // Use SOCKET_URL for image/document URLs

const statusColors = {
  approved: 'text-green-600',
  pending: 'text-yellow-500',
  rejected: 'text-red-500',
};

const AllDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tab, setTab] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminAPI.getAllDrivers();
      setDrivers(res.data || []);
    } catch (err) {
      setError(err.error || 'Failed to fetch drivers');
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    setActionLoading(id + '-approve');
    setError('');
    setSuccess('');
    try {
      await adminAPI.verifyDriver(id, true);
      setSuccess('Driver approved successfully');
      fetchDrivers();
    } catch (err) {
      setError(err.error || 'Failed to approve driver');
    }
    setActionLoading(null);
  };

  const handleReject = async (id) => {
    setActionLoading(id + '-reject');
    setError('');
    setSuccess('');
    try {
      await adminAPI.verifyDriver(id, false);
      setSuccess('Driver rejected');
      fetchDrivers();
    } catch (err) {
      setError(err.error || 'Failed to reject driver');
    }
    setActionLoading(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this driver?')) return;
    setActionLoading(id + '-delete');
    setError('');
    setSuccess('');
    try {
      await adminAPI.deleteDriver(id);
      setSuccess('Driver removed');
      fetchDrivers();
    } catch (err) {
      setError(err.error || 'Failed to remove driver');
    }
    setActionLoading(null);
  };

  const filteredDrivers = drivers.filter((d) => {
    if (tab === 'all') return true;
    if (tab === 'pending') return !d.isVerified;
    if (tab === 'approved') return d.isVerified;
    return true;
  });

  return (
    <div className="w-full h-full px-12 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2 text-left flex items-center gap-2"><FiUser className="inline-block" /> All Drivers</h1>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab('all')} className={`px-4 py-2 rounded font-semibold ${tab==='all' ? 'bg-sky-400 text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
        <button onClick={() => setTab('pending')} className={`px-4 py-2 rounded font-semibold ${tab==='pending' ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}>Pending Approval</button>
        <button onClick={() => setTab('approved')} className={`px-4 py-2 rounded font-semibold ${tab==='approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Active</button>
      </div>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 border-l-4 border-red-500 text-sm">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 border-l-4 border-green-500 text-sm">{success}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Vehicle No</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Registered</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-8">Loading...</td></tr>
            ) : filteredDrivers.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8 text-gray-500">No drivers found</td></tr>
            ) : filteredDrivers.map(driver => (
              <tr key={driver._id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold flex items-center gap-2"><FiUser className="text-blue-400" /> {driver.fullName}</td>
                <td className="py-3 px-4">{driver.mobileNo}</td>
                <td className="py-3 px-4">{driver.vehicleNo}</td>
                <td className="py-3 px-4">
                  {driver.isVerified ? (
                    <span className="flex items-center gap-1 text-green-600"><FiCheckCircle /> Active</span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-500"><FiClock /> Pending Approval</span>
                  )}
                </td>
                <td className="py-3 px-4">{driver.registrationDate ? new Date(driver.registrationDate).toLocaleDateString() : '-'}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="p-2 rounded hover:bg-gray-200" title="View Details" onClick={() => { setSelectedDriver(driver); setShowDetails(true); }}><FiEye /></button>
                  {!driver.isVerified && (
                    <>
                      <button disabled={actionLoading===driver._id+'-approve'} onClick={() => handleApprove(driver._id)} className="p-2 rounded hover:bg-green-100 text-green-600" title="Approve"><FiCheckCircle /></button>
                      <button disabled={actionLoading===driver._id+'-reject'} onClick={() => handleReject(driver._id)} className="p-2 rounded hover:bg-yellow-100 text-yellow-600" title="Reject"><FiXCircle /></button>
                    </>
                  )}
                  {driver.isVerified && (
                    <button disabled={actionLoading===driver._id+'-delete'} onClick={() => handleDelete(driver._id)} className="p-2 rounded hover:bg-red-100 text-red-600" title="Remove"><FiTrash2 /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDetails && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl" onClick={() => setShowDetails(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><FiUser /> Driver Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <p><span className="font-semibold">Name:</span> {selectedDriver.fullName}</p>
                <p><span className="font-semibold">Phone:</span> {selectedDriver.mobileNo}</p>
                <p><span className="font-semibold">Aadhaar No:</span> {selectedDriver.aadhaarNo}</p>
                <p><span className="font-semibold">Vehicle No:</span> {selectedDriver.vehicleNo}</p>
                <p><span className="font-semibold">Status:</span> {selectedDriver.isVerified ? 'Active' : 'Pending Approval'}</p>
                <p><span className="font-semibold">Registered:</span> {selectedDriver.registrationDate ? new Date(selectedDriver.registrationDate).toLocaleDateString() : '-'}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Bank Details</h3>
                <p><span className="font-semibold">Account Holder:</span> {selectedDriver.bankDetails?.accountHolderName}</p>
                <p><span className="font-semibold">Account Number:</span> {selectedDriver.bankDetails?.accountNumber}</p>
                <p><span className="font-semibold">IFSC Code:</span> {selectedDriver.bankDetails?.ifscCode}</p>
                <p><span className="font-semibold">Bank Name:</span> {selectedDriver.bankDetails?.bankName}</p>
              </div>
            </div>
            <h3 className="font-semibold mb-2">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDriver.aadhaarPhoto && (
                <div className="flex flex-col items-start max-w-full">
                  <span className="font-semibold">Aadhaar Photo:</span>
                  <div className="relative w-full">
                    <img
                      src={`${backendBaseUrl}/${selectedDriver.aadhaarPhoto}`}
                      alt="Aadhaar"
                      className="max-w-full max-h-40 border rounded mt-1 object-contain bg-gray-50"
                      style={{ width: '100%', height: '160px' }}
                    />
                    <a
                      href={`${backendBaseUrl}/${selectedDriver.aadhaarPhoto}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline mt-1 inline-block"
                    >Open in new window</a>
                  </div>
                </div>
              )}
              {selectedDriver.registrationCertificatePhoto && (
                <div className="flex flex-col items-start max-w-full">
                  <span className="font-semibold">Registration Certificate:</span>
                  <div className="relative w-full">
                    <img
                      src={`${backendBaseUrl}/${selectedDriver.registrationCertificatePhoto}`}
                      alt="RC"
                      className="max-w-full max-h-40 border rounded mt-1 object-contain bg-gray-50"
                      style={{ width: '100%', height: '160px' }}
                    />
                    <a
                      href={`${backendBaseUrl}/${selectedDriver.registrationCertificatePhoto}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline mt-1 inline-block"
                    >Open in new window</a>
                  </div>
                </div>
              )}
              {selectedDriver.drivingLicensePhoto && (
                <div className="flex flex-col items-start max-w-full">
                  <span className="font-semibold">Driving License:</span>
                  <div className="relative w-full">
                    <img
                      src={`${backendBaseUrl}/${selectedDriver.drivingLicensePhoto}`}
                      alt="DL"
                      className="max-w-full max-h-40 border rounded mt-1 object-contain bg-gray-50"
                      style={{ width: '100%', height: '160px' }}
                    />
                    <a
                      href={`${backendBaseUrl}/${selectedDriver.drivingLicensePhoto}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline mt-1 inline-block"
                    >Open in new window</a>
                  </div>
                </div>
              )}
              {selectedDriver.permitPhoto && (
                <div className="flex flex-col items-start max-w-full">
                  <span className="font-semibold">Permit:</span>
                  <div className="relative w-full">
                    <img
                      src={`${backendBaseUrl}/${selectedDriver.permitPhoto}`}
                      alt="Permit"
                      className="max-w-full max-h-40 border rounded mt-1 object-contain bg-gray-50"
                      style={{ width: '100%', height: '160px' }}
                    />
                    <a
                      href={`${backendBaseUrl}/${selectedDriver.permitPhoto}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline mt-1 inline-block"
                    >Open in new window</a>
                  </div>
                </div>
              )}
              {selectedDriver.fitnessCertificatePhoto && (
                <div className="flex flex-col items-start max-w-full">
                  <span className="font-semibold">Fitness Certificate:</span>
                  <div className="relative w-full">
                    <img
                      src={`${backendBaseUrl}/${selectedDriver.fitnessCertificatePhoto}`}
                      alt="Fitness"
                      className="max-w-full max-h-40 border rounded mt-1 object-contain bg-gray-50"
                      style={{ width: '100%', height: '160px' }}
                    />
                    <a
                      href={`${backendBaseUrl}/${selectedDriver.fitnessCertificatePhoto}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline mt-1 inline-block"
                    >Open in new window</a>
                  </div>
                </div>
              )}
              {selectedDriver.insurancePolicyPhoto && (
                <div className="flex flex-col items-start max-w-full">
                  <span className="font-semibold">Insurance Policy:</span>
                  <div className="relative w-full">
                    <img
                      src={`${backendBaseUrl}/${selectedDriver.insurancePolicyPhoto}`}
                      alt="Insurance"
                      className="max-w-full max-h-40 border rounded mt-1 object-contain bg-gray-50"
                      style={{ width: '100%', height: '160px' }}
                    />
                    <a
                      href={`${backendBaseUrl}/${selectedDriver.insurancePolicyPhoto}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline mt-1 inline-block"
                    >Open in new window</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDrivers; 