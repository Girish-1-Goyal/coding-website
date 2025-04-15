import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accessCode = import.meta.env.VITE_ACCESS_CODE;
    
    if (code === accessCode) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      setError('Invalid access code');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Enter Access Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter access code"
            className="auth-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth; 