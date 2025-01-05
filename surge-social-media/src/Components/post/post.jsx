import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore'; 
import './post.css';

const Post = ({ image, username, datePosted, initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Handle Firestore Timestamp or JavaScript Date
    if (datePosted instanceof Timestamp) {
      const date = datePosted.toDate();  // Convert Firestore Timestamp to JavaScript Date
      setFormattedDate(formatDistanceToNow(date, { addSuffix: true }));
    } else if (datePosted instanceof Date && !isNaN(datePosted)) {
      setFormattedDate(formatDistanceToNow(datePosted, { addSuffix: true }));
    } else {
      setFormattedDate('Invalid date');
    }
  }, [datePosted]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    
    <div className="post">
      
      <img src={image} alt="Post" className="postImage" />
      <div className="postDetails">
        <div className="postHeader">
          <div className="likeSection" onClick={handleLike}>
            <FaHeart size={24} color={liked ? 'red' : 'gray'} />
            <span>{likes} Likes</span>
          </div>
          <span className="username">{username}</span>
          <span className="date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
