import React, { useState } from 'react';
import './Login.css';
import surgeLogo from '../../assets/surge_logo.png';
import { useNavigate } from 'react-router-dom';
import { signInUser, createUser, saveUserData } from './firebaseUtils'; 
import FormFields from './formFields'; 
import ToggleForm from './ToggleForm'; 

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Append a dummy domain if the email does not contain '@'
    const processedEmail = email.includes('@') ? email : `${email}@example.com`;
  
    if (isLogin) {
      // Login logic
      try {
        await signInUser(processedEmail, password);
        setSuccessMessage("Login successful");
        navigate('/home');
      } catch (error) {
        setErrorMessage("Login failed: " + error.message);
      }
    } else {
      // Sign Up logic
      if (password !== confirmPassword) {
        setErrorMessage("Passwords don't match");
        return;
      }
  
      try {
        const user = await createUser(processedEmail, password);
        const userData = {
          email: processedEmail,
          firstName: firstName,
          lastName: lastName,
          picture: "",
          createdAt: new Date(),
        };
  
        await saveUserData(user.uid, userData);
        setSuccessMessage("User created and data saved to Firestore!");
  
        // Navigate to the login form after sign-up
        setTimeout(() => {
          toggleForm();
        }, 2000);
      } catch (error) {
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
            />
            <button type="submit" className="auth-button">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <ToggleForm isLogin={isLogin} toggleForm={toggleForm} />
        </div>
      </div>
    </div>
  );
};

export default Login;
