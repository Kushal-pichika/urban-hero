import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // For error message
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setErrorMessage(''); // Reset error message on each login attempt

    if (email === 'user@example.com' && password === 'user123') {
      localStorage.setItem('role', 'user');
      navigate('/user-dashboard');
    } else if (email === 'manager@example.com' && password === 'manager123') {
      localStorage.setItem('role', 'manager');
      navigate('/manager-dashboard');
    } else if (email === 'cleaner@example.com' && password === 'cleaner123') {
      localStorage.setItem('role', 'cleaner');
      navigate('/cleaner-dashboard');
    } else {
      setErrorMessage('Invalid credentials. Please check your email and password.');
      return;
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            id="show-password" 
            checked={showPassword} 
            onChange={() => setShowPassword(!showPassword)} 
          />
          <label htmlFor="show-password">Show Password</label>
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message display */}
      </form>
    </div>
  );
};

export default Login;