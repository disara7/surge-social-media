import React, { useState, useEffect } from 'react';
import Post from '../post/post';
import './home.css';
import Navbar from '../Navbar/Navbar';
import ProfileOverview from '../Profile/ProfileOverview';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const Home = () => {
  const [posts, setPosts] = useState([]); // State to hold posts with image URLs

  useEffect(() => {
    // Fetch posts from Firebase Storage
    const fetchPosts = async () => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/'); // Folder where images are stored
        const imageRefs = await listAll(storageRef); // Get a list of all image references

        const postsData = await Promise.all(
          imageRefs.items.map(async (itemRef) => {
            try {
              const imageUrl = await getDownloadURL(itemRef); // Get the download URL for each image
              return {
                image: imageUrl,
                username: 'JohnDoe', // You can dynamically fetch or store this info
                datePosted: 'Just now', // You can adjust based on your post data
                initialLikes: 120 // Example likes count
              };
            } catch (error) {
              console.error('Error fetching image URL:', error);
              return null; // Skip the post if the image URL fetch fails
            }
          })
        );

        // Filter out any posts where imageUrl fetching failed
        const validPostsData = postsData.filter((post) => post !== null);
        setPosts(validPostsData); // Set posts with image URLs
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts(); // Make sure to call the function inside useEffect
  }, []); // Empty array means this will run once on component mount

  return (
    <div className="home">
      <Navbar />
      <div className="content">
        <div className="posts">
          {posts.map((post, index) => (
            <Post
              key={index}
              image={post.image}
              username={post.username}
              datePosted={post.datePosted}
              initialLikes={post.initialLikes}
            />
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
