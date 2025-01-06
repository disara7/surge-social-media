import React, { useEffect, useState } from 'react';
import './ProfileOverview.css';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 
import { getFirestore, doc, getDoc } from 'firebase/firestore'; 

const ProfileOverview = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    picture: '', // To hold the profile picture URL
  }); // State to hold user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Fetch additional user data from Firestore
          const db = getFirestore();
          const userDoc = doc(db, 'users', user.uid); 
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              firstName: data.firstName || 'FirstName',
              lastName: data.lastName || 'LastName',
              email: user.email || 'Email',
              picture: data.picture || '', // Set the picture from Firestore
            });
          } else {
            console.error('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data: ', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logout
      console.log('User logged out successfully');
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out: ', error.message);
    }
  };

  // Helper function to clean the displayed username/email
  const formatUsername = (email) => {
    return email.includes('@example.com') ? email.split('@')[0] : email;
  };

  return (
    <div className="profileOverview">
      <div className="profileImageContainer">
        <img 
          src={userData.picture || 'https://via.placeholder.com/150'} 
          alt="Profile" 
          className="profileImage" 
        />
      </div>
      <h3>
        {userData.firstName} {userData.lastName}
      </h3>
      <p>{formatUsername(userData.email)}</p> 
      <button onClick={handleLogout} className="logoutButton">
        Logout
      </button>
    </div>
  );
};

export default ProfileOverview;
