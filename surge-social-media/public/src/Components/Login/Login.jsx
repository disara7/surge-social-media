import React, { useState } from 'react';
import './Login.css';
import surgeLogo from '../../assets/surge_logo.png';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login">
        <img src={surgeLogo} alt="Surge Logo" className="logo" />
        <div className="auth-container">
        
      <div className="form-container">
        <h2>{isLogin ? 'Login to Continue' : 'Create an Account'}</h2>
        <form className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" required />
            </div>
          )}
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
