import React from 'react';
import { FaHome, FaSearch, FaCompass, FaCog, FaPlus } from 'react-icons/fa';
import './navbar.css';
import logo from '../../assets/surge_logo.png';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create-post'); 
  };

  const handleHomeClick = () => {
    navigate('/home'); 
  };

  return (
    <div className="navbar">
      <img src={logo} alt="Surge Logo" />
      <div className="navItem" onClick={handleHomeClick}>
        <FaHome size={24} className="icon" />
        <span className="text">Home</span>
      </div>
      <div className="navItem">
        <FaSearch size={24} className="icon" />
        <span className="text">Search</span>
      </div>
      <div className="navItem">
        <FaCompass size={24} className="icon" />
        <span className="text">Explore</span>
      </div>
      <div className="navItem">
        <FaCog size={24} className="icon" />
        <span className="text">Settings</span>
      </div>
      
      <div className="navItem createPost" onClick={handleCreatePost}>
        <FaPlus size={24} className="icon" />
        <span className="text">Create Post</span>
      </div>
    </div>
  );
};

export default Navbar;
