import React, { useState } from 'react';
import './Login.css';
import surgeLogo from '../../assets/surge_logo.png';
import { useNavigate } from 'react-router-dom';
import { signInUser, createUser, saveUserData } from './firebaseUtils';
import FormFields from './formFields';
import ToggleForm from './ToggleForm';
import ReCAPTCHA from 'react-google-recaptcha';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // For profile picture
  const [username, setUsername] = useState(''); // New state for username
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setErrorMessage('Please complete the CAPTCHA');
      return;
    }

    const processedEmail = email.includes('@') ? email : `${email}@example.com`;

    if (isLogin) {
      // Login
      try {
        await signInUser(processedEmail, password);
        setSuccessMessage('Login successful');
        navigate('/home');
      } catch (error) {
        setErrorMessage('Login failed: ' + error.message);
      }
    } else {
      // Sign Up
      if (password !== confirmPassword) {
        setErrorMessage("Passwords don't match");
        return;
      }

      try {
        const user = await createUser(processedEmail, password);

        let profilePictureUrl = '';
        if (profilePicture) {
          // Upload profile picture to Firebase Storage
          const storage = getStorage();
          const pictureRef = ref(storage, `profilePictures/${profilePicture.name}`);
          await uploadBytes(pictureRef, profilePicture);
          profilePictureUrl = await getDownloadURL(pictureRef);
        }

        const userData = {
          email: processedEmail,
          firstName,
          lastName,
          username: username || `${firstName} ${lastName}`, // Use username if provided, otherwise combine first and last name
          picture: profilePictureUrl,
          createdAt: new Date(),
        };

        await saveUserData(user.uid, userData);
        setSuccessMessage('User created and data saved to Firestore!');
        setTimeout(() => toggleForm(), 2000);
      } catch (error) {
        setErrorMessage('Signup failed: ' + error.message);
      }
    }
  };

  return (
    <div className="login">
      <img src={surgeLogo} alt="Surge Logo" className="logo" />
      <div className="auth-container">
        <div className="form-container">
          <h2>{isLogin ? 'Login to Continue' : 'Create an Account'}</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <FormFields
              isLogin={isLogin}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              profilePicture={profilePicture} // Added for profile picture
              setProfilePicture={setProfilePicture} // Added for profile picture
              username={username} // Added for username input
              setUsername={setUsername} // Added for username input
            />
            <div className="captcha-container">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
              {errorMessage === 'Please complete the CAPTCHA' && (
                <span className="error">{errorMessage}</span>
              )}
            </div>
            <button type="submit" className="auth-button">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <ToggleForm isLogin={isLogin} toggleForm={toggleForm} />
        </div>
      </div>
      <div className="bottom">
        <p>Surge SE Internship - January 2025 | Disara Mapalagama</p>
      </div>
    </div>
  );
};

export default Login;
