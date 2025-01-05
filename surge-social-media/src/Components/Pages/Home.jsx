import React, { useState, useEffect } from 'react';
import Post from '../post/post';
import './home.css';
import Navbar from '../Navbar/Navbar';
import ProfileOverview from '../Profile/ProfileOverview';
import { getStorage, ref, listAll } from 'firebase/storage';

const Home = () => {
  const [postIds, setPostIds] = useState([]); // State to hold post IDs

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/'); // Folder where images are stored
        const imageRefs = await listAll(storageRef); // Get a list of all image references

        const ids = imageRefs.items.map(itemRef => itemRef.name); // Extract postIds from image names
        setPostIds(ids); // Set postIds
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts(); 
  }, []); // Empty array means this will run once on component mount

  return (
    <div className="home">
      <Navbar />
      <div className="content">
        <div className="posts">
          {postIds.map((postId, index) => (
            <Post key={index} postId={postId} />
          ))}
        </div>
      </div>
      <div className="profileContent">
        <ProfileOverview />
      </div>
    </div>
  );
};

export default Home;
