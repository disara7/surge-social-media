import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css'
import logo from '../../assets/surge_logo.png'


const Landing = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="landing">
      <img className='land-logo' src={logo} alt="" />
      <h2 className='tagline'>social media</h2>
      <button className='cont-button' onClick={handleLoginClick}>
        TAP TO CONTINUE
      </button>
    </div>
  );
};

export default Landing;
