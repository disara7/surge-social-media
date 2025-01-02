// ToggleForm.js
import React from 'react';

const ToggleForm = ({ isLogin, toggleForm }) => (
  <p className="toggle-text">
    {isLogin ? "Don't have an account? " : 'Already have an account? '}
    <span onClick={toggleForm} className="toggle-link">
      {isLogin ? 'Sign Up' : 'Login'}
    </span>
  </p>
);

export default ToggleForm;
