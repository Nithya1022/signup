import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Get user info from storage
      if (!user || !user.email) {
        console.error("No user found in localStorage");
        navigate('/login'); // Redirect to login if no user data is available
        return;
      }
  
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });
  
      if (!response.ok) {
        // Log any issues if response is not OK
        console.error("Logout failed with status:", response.status, response.statusText);
        return;
      }
  
      // Parse JSON response
      const data = await response.json();
      console.log("Logout response:", data.message);
  
      // Clear localStorage and redirect
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error.message || error);
    }
  };
  

  return (
    <div className="container">
      <h2>Welcome to your Dashboard!</h2>
      <p>This is your secure dashboard where you can manage your account.</p>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>
  );
};

export default Dashboard;
