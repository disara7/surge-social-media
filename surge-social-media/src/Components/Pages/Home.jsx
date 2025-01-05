import React, { useState, useEffect } from 'react';
import Post from '../post/post';
import './home.css';
import Navbar from '../Navbar/Navbar';
import ProfileOverview from '../Profile/ProfileOverview';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';

const Home = () => {
  const [posts, setPosts] = useState([]); // State to hold post metadata (likes, datePosted)
  const [sortCriteria, setSortCriteria] = useState('date'); // Sorting criteria ('date' or 'likes')
  const [imageUrls, setImageUrls] = useState({}); // State to hold image URLs from Firebase Storage

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const db = getFirestore();
        const postCollectionRef = collection(db, 'posts');

        // Apply Firestore query based on the selected sort criteria
        let postQuery;
        if (sortCriteria === 'date') {
          postQuery = query(postCollectionRef, orderBy('datePosted', 'desc')); // Sort by date (newest first)
        } else if (sortCriteria === 'likes') {
          postQuery = query(postCollectionRef, orderBy('likes', 'desc')); // Sort by likes (most liked first)
        }

        // Fetch post data from Firestore (including likes and datePosted)
        const postsSnapshot = await getDocs(postQuery);
        const postList = postsSnapshot.docs.map(doc => doc.data());

        setPosts(postList); // Set post metadata

        // Fetch image URLs from Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, 'images/');
        const imageRefs = await listAll(storageRef); // Get a list of all image references

        const imageUrlMap = {};
        for (const itemRef of imageRefs.items) {
          const url = await getDownloadURL(itemRef); // Get download URL for each image
          imageUrlMap[itemRef.name] = url; // Map image names to URLs
        }

        setImageUrls(imageUrlMap); // Set image URLs

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [sortCriteria]); // Fetch posts whenever sortCriteria changes

  return (
    <div className="home">
      <Navbar />
      <div className="content">
        <div className="sorting">
          <button onClick={() => setSortCriteria('date')}>Sort by Date</button>
          <button onClick={() => setSortCriteria('likes')}>Sort by Likes</button>
        </div>
        <div className="posts">
          {posts.map((post, index) => (
            <Post key={index} postId={post.imageUrl} imageUrl={imageUrls[post.imageUrl]} /> 
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
