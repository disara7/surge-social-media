import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div>
      <h2>Landing Page</h2>
      <button onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
};

export default Landing;
