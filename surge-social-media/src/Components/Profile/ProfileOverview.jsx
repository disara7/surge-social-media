import React from 'react'
import './ProfileOverview.css'
import pp from '../../assets/pp.png'

const ProfileOverview = () => {
  return (
    <div className="profileOverview">
      <div className="profileImageContainer">
        <img src= {pp} alt="Profile" className="profileImage" />
      </div>
      <h3>Profile Fullname</h3>
      <p>JohnDoe</p>
      <p>Followers: 200</p>
      <p>Following: 180</p>
    </div>
  )
}

export default ProfileOverview
