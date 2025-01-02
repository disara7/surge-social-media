import React from 'react'
import { FaHome, FaSearch, FaCompass, FaCog } from 'react-icons/fa'
import './navbar.css'
import logo from '../../assets/surge_logo.png'

const Navbar = () => {
  return (
    <div className="navbar">
        <img src={logo} alt="" />
      <div className="navItem">
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
    </div>
  )
}

export default Navbar
