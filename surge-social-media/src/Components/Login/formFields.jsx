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
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = {};
  
    // Name validation
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
  
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }
  
    // Password validation
    if (!password) newErrors.password = 'Password field is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
  
    // Confirm Password validation
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password field is required';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true

    
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null); 
    setPreview(null); 
  };

  return (
    <div className="form-fields" onSubmit={handleSubmit} role="form">
      <div className="left">
        {!isLogin && (
          <div className="name-inputs">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>
        )}
        <div className="input-group">
          <label htmlFor="email">Email / Username</label>
          <input
            type="text"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
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
            {errors.password && <span className="error">{errors.password}</span>}
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
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
        </div>
      </div>
      <div className="righ">
        {!isLogin && (
          <div className="input-group profile-pic-group">
            <label for="profile-upload">Profile Picture</label>
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
