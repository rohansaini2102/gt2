// client/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import LandingPage from './pages/LandingPage';
// Admin
import AdminDashboard from './pages/admin/Dashboard';
import DriverList from './pages/admin/DriverList';
import DriverDetails from './pages/admin/DriverDetails';
import AddUser from './pages/admin/AddUser';
import ViewUsers from './pages/admin/ViewUsers';
import ViewUserDetails from './pages/admin/ViewUserDetails';
import DriverRegistration from './pages/driver/Registration';
import AdminLogin from './pages/admin/AdminLogin';
// Driver
import DriverDashboard from './pages/driver/Dashboard';
import DriverLogin from './pages/driver/Login';
import DriverSignup from './pages/driver/Signup';
import DriverProfile from './pages/driver/Profile';
// User
import UserDashboard from './pages/user/Dashboard';
import UserLogin from './pages/user/Login';
import UserSignup from './pages/user/Signup';
import ForgotPassword from './pages/user/ForgotPassword';

const GOOGLE_MAPS_API_KEY = "AIzaSyDFbjmVJoi2wDzwJNR2rrowpSEtSes1jw4";
const libraries = ["places", "geometry"];

function App() {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries} >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/drivers" element={<DriverList />} />
        <Route path="/admin/drivers/:id" element={<DriverDetails />} />
        <Route path="/admin/register-driver" element={<DriverRegistration />} />
        <Route path="/driver/signup" element={<DriverSignup />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/view-users" element={<ViewUsers />} />
        <Route path="/admin/users/:id" element={<ViewUserDetails />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/profile/:id" element={<DriverProfile />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </LoadScript>
  );
}

export default App;