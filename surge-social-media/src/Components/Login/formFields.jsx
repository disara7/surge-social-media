import React, { useState } from 'react';
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
  profilePicture,
}) => {
  const [preview, setPreview] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null); // Clear the selected profile picture
    setPreview(null); // Clear the preview
  };

  return (
    <div className="form-fields">
      <div className="left">
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
      </div>
      <div className="righ">
      {!isLogin && (
        <div className="input-group profile-pic-group">
          <label>Profile Picture</label>
          {!preview ? (
            <>
              <label htmlFor="profile-upload" className="file-upload-button">
                <AiOutlinePlus size={30} />
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
              />
            </>
          ) : (
            <div className="profile-preview-container">
              <div className="profile-preview">
                <img src={preview} alt="Profile Preview" />
              </div>
              <div className="profile-actions">
                <button className="remove-button" onClick={handleRemoveProfilePicture}>
                  Remove
                </button>
                <label htmlFor="profile-upload" className="file-upload-button">
                  Change
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          )}
          {profilePicture && <p className="file-name">{profilePicture.name}</p>}
        </div>
      )}
      </div>
    </div>
  );
};

export default FormFields;
