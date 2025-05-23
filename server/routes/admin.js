// routes/admin.js
const express = require('express');
const router = express.Router();
const { adminProtect } = require('../middleware/auth');
const { driverFileUpload } = require('../middleware/upload');
const { registerDriver } = require('../controllers/driverController');
const { 
  getAllDrivers, 
  getDriverById,
  getAllUsers,
  getUserById,
  verifyDriver
} = require('../controllers/adminController');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin routes for driver management
router.get('/drivers', adminProtect, getAllDrivers);
router.get('/drivers/:id', adminProtect, getDriverById);
router.post('/drivers', adminProtect, driverFileUpload, registerDriver);

// Admin routes for user management
router.get('/users', adminProtect, getAllUsers);
router.get('/users/:id', adminProtect, getUserById);

// Approve/reject driver
router.put('/drivers/:id/verify', adminProtect, verifyDriver);

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1d' });
    res.json({ success: true, token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Export router
module.exports = router;