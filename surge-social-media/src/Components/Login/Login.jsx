import React, { useState } from 'react';
import './Login.css';
import surgeLogo from '../../assets/surge_logo.png';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const saveUserData = async (userId, data) => {
    try {
      await setDoc(doc(db, 'users', userId), data);
      console.log("User data saved");
    } catch (error) {
      console.error("Error saving user data: ", error);
      setErrorMessage("Error saving user data: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (isLogin) {
      // Login logic
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in successfully");
        setSuccessMessage("Login successful");
        
        // Navigate to the homepage after login
        navigate('/home');  // Replace '/home' with the correct route for your homepage
      } catch (error) {
        console.error(error.message);
        setErrorMessage("Login failed: " + error.message);
      }
    } else {
      // Sign Up logic
      if (password !== confirmPassword) {
        console.error("Passwords don't match");
        setErrorMessage("Passwords don't match");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        const userData = {
          email: email,
          createdAt: new Date(),
        };

        await saveUserData(user.uid, userData); // Call the saveUserData function

        // Show success message when the user is created and data is saved
        setSuccessMessage("User created and data saved to Firestore!");
        console.log("User created and data saved to Firestore");

        // Navigate to the homepage after sign up
        navigate('/home');  // Replace '/home' with the correct route for your homepage
      } catch (error) {
        console.error(error.message);
        setErrorMessage("Signup failed: " + error.message);
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
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
            {!isLogin && (
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
            )}
            <button type="submit" className="auth-button">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          
          {successMessage && <p className="success-message">{successMessage}</p>}

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span onClick={toggleForm} className="toggle-link">
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
