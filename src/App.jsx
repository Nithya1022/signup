import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const App = () => {
  const isAuthenticated = localStorage.getItem('user'); // Check if the user is logged in

  return (
    <Router>
      <Routes>
        {/* Redirect to Signup if the app starts */}
        <Route path="/" element={<Navigate to="/signup" />} />
        
        {/* Signup page */}
        <Route path="/signup" element={<SignupForm />} />

        {/* Login page */}
        <Route path="/login" element={<LoginForm />} />

        {/* Dashboard (protected route) */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
