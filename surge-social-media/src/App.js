import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing'; 
import Login from './Components/Login/Login'; 
import Home from './Components/Pages/Home';
import ProfileOverview from './Components/Profile/ProfileOverview';
import CreatePost from './Components/post/CreatePost';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfileOverview />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
