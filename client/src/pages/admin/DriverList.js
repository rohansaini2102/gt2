// client/src/pages/admin/DriverList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDrivers } from '../../services/api';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getAllDrivers();
        setDrivers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch drivers');
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mb-4">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Registered Drivers</h1>
        <Link to="/admin" className="text-blue-600 hover:underline mb-4 inline-block">Back to Admin Dashboard</Link>
        <div>
          {drivers.length === 0 ? (
            <p className="text-gray-500">No drivers registered yet</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {drivers.map((driver) => (
                <li key={driver._id} className="py-3 flex justify-between items-center">
                  <Link to={`/admin/drivers/${driver._id}`} className="text-blue-700 hover:underline font-semibold">
                    {driver.fullName} - {driver.vehicleNo}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-2">&copy; 2025 GANTAVYAM. All rights reserved.</div>
    </div>
  );
};

export default DriverList;