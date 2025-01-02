import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import './post.css'

const Post = ({ image, username, datePosted, initialLikes }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

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
          <span className="date">{datePosted}</span>
        
      </div>
      </div>
    </div>
  )
}

export default Post
