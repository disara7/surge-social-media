import React, { useState, useEffect } from 'react';
import Post from '../post/post';
import './home.css';
import Navbar from '../Navbar/Navbar';
import ProfileOverview from '../Profile/ProfileOverview';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions


const Home = () => {
  const [posts, setPosts] = useState([]); // State to hold posts with image URLs
  

  // Function to fetch the username based on user UID
  const fetchUsername = async (userId) => {
    try {
      const db = getFirestore();
      const userDoc = doc(db, 'users', userId); // Assuming you store user info in 'users' collection
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        return docSnap.data().firstName || 'JohnDoe'; // Return first name or fallback
      } else {
        console.error('No user found!');
        return 'Unknown User';
      }
    } catch (error) {
      console.error('Error fetching username: ', error);
      return 'Unknown User';
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/'); // Folder where images are stored
        const imageRefs = await listAll(storageRef); // Get a list of all image references

        const postsData = await Promise.all(
          imageRefs.items.map(async (itemRef) => {
            try {
              const imageUrl = await getDownloadURL(itemRef); // Get the download URL for each image
              const userId = itemRef.name.split('_')[0]; // Assuming user UID is part of the image file name

              const username = await fetchUsername(userId); // Fetch username based on UID

              return {
                image: imageUrl,
                username: username, // Dynamically fetch and set username
                datePosted: 'Just now', // You can adjust based on your post data
                initialLikes: 120, // Example likes count
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

    fetchPosts(); // Call the function inside useEffect to fetch posts

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
              username={post.username} // Pass dynamic username here
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
