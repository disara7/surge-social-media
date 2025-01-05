import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai'; 

const FormFields = ({
  isLogin,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  setProfilePicture,
  profilePicture
}) => {
  return (
    <>
      {!isLogin && (
        <div className="name-inputs">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
      )}
      <div className="input-group">
        <label>Email / Username</label>
        <input
          type="text" 
          placeholder="Enter your email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="password-inputs">
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>
      {!isLogin && (
        <>
          <div className="input-group pic">
            <label>Profile Picture</label>
            <label htmlFor="profile-upload" className="file-upload-button">
              <AiOutlinePlus size={30} /> 
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              style={{ display: 'none' }} 
            />
            {profilePicture && <p>{profilePicture.name}</p>}
          </div>
        </>
      )}
    </>
  );
};

export default FormFields;
