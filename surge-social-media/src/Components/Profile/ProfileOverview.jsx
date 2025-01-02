import React from 'react';
import './ProfileOverview.css';
import pp from '../../assets/pp.png';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';  // Import your Firebase auth configuration

const ProfileOverview = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogout = async () => {
    try {
      await signOut(auth);  // Log the user out
      console.log("User logged out successfully");
      navigate('/login');  // Redirect to the login page
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  return (
    <div className="profileOverview">
      <div className="profileImageContainer">
        <img src={pp} alt="Profile" className="profileImage" />
      </div>
      <h3>Profile Fullname</h3>
      <p>JohnDoe</p>
      <p>Followers: 200</p>
      <p>Following: 180</p>
      <button onClick={handleLogout} className="logoutButton">
        Logout
      </button>
    </div>
  );
};

export default ProfileOverview;
