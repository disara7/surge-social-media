import React, { useState, useEffect, useCallback } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import './post.css';

const Post = ({ postId }) => {
  const [postData, setPostData] = useState(null);
  const [isLiked, setIsLiked] = useState(false); // Track whether the post is liked
  const [likes, setLikes] = useState(0); // Track the number of likes

  // Function to fetch the username and other post data based on postId
  const fetchPostData = useCallback(async () => {
    try {
      const db = getFirestore();
      const postDoc = doc(db, 'posts', postId); // Fetch post data from 'posts' collection using postId
      const docSnap = await getDoc(postDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const timestamp = data.datePosted?.toDate(); // Convert Firestore timestamp to JS Date
        const formattedDate = timestamp
          ? timestamp.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' }) // Only show date (without time)
          : 'Just now';
        // Set the post data
        setPostData({
          image: data.imageUrl,  // The image URL stored in Firestore
          username: data.username,
          datePosted: formattedDate,  // Formatted date
        });

        // Set likes from Firestore
        setLikes(data.likes || 0);
      } else {
        console.error('No post found!');
      }
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchPostData();
  }, [postId, fetchPostData]); // Use useEffect to call fetchPostData when postId changes

  // Handle like button click
  const handleLikeClick = () => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setIsLiked(!isLiked); // Toggle the like status
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post">
      <img src={postData.image} alt="Post" className="post-image" />
      <div className="post-footer">
        <div className="post-header">
          {isLiked ? (
            <FaHeart className="heart-icon liked" onClick={handleLikeClick} /> // Filled heart when liked
          ) : (
            <FaRegHeart className="heart-icon" onClick={handleLikeClick} /> // Regular heart when not liked
          )}
          <span className="likes">{likes} Likes</span>
        </div>
        <div className="post-info">
          <span className="username">{postData.username}</span>
          <span className="date-posted">{postData.datePosted}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
