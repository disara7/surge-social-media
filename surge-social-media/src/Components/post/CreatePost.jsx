import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar'; 
import './CreatePost.css'

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Submit the post to the database or perform other actions
    console.log('Post submitted:', postContent);
  };

  return (
    <div className="createPost">
      <Navbar /> {/* Include Navbar component here */}
      <div className="creator">
      <h2 className='subheading'>Create a New Post</h2>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={postContent}
          onChange={handlePostChange}
          placeholder="Write something..."
          required
        />
        <button type="submit">Post</button>
      </form>
      </div>
    </div>
  );
};

export default CreatePost;
