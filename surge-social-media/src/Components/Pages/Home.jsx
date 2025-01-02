import React from 'react'
import Post from '../post/post'
import './home.css'
import Navbar from '../Navbar/Navbar'
import pic from '../../assets/pic1.jpg'
import ProfileOverview from '../Profile/ProfileOverview'

const Home = () => {
  const posts = [
    {
      image: pic,
      username: 'JohnDoe',
      datePosted: '2 hours ago',
      initialLikes: 120
    },
    {
      image: 'https://via.placeholder.com/300',
      username: 'JaneSmith',
      datePosted: '5 hours ago',
      initialLikes: 85
    },
    // Add more posts as needed
  ]

  return (
    <div className="home">
        <Navbar/>
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
  )
}

export default Home
