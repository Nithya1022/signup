import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGoogleLogin = () => {
    // Redirect to the backend route that initiates Google authentication
    window.location.href = 'http://localhost:5000/auth/google';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Login failed.');
        return;
      }

      // Store user session (example: using localStorage)
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Login successful! Redirecting to dashboard...');
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-primary">Login</button>
      {message && <div>{message}</div>}
      <button onClick={handleGoogleLogin} className="btn btn-danger">
        Login with Google
      </button>
    </form>
    
  );
};

export default LoginForm;
