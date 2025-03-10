import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import './CreatePost.css';
import Navbar from '../Navbar/Navbar';
import ProfileOverview from '../Profile/ProfileOverview';
import Post from './post';

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [postDetails, setPostDetails] = useState(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to upload an image.');
      return;
    }

    if (!selectedImage) {
      alert('Please select an image to upload.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const storage = getStorage();
    const db = getFirestore();
    const storageRef = ref(storage, 'images/' + selectedImage.name);

    try {
      const snapshot = await uploadBytes(storageRef, selectedImage);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Get current date as a Firestore Timestamp
      const datePosted = Timestamp.now();  // Using Firestore Timestamp

      // Save post data (including username and email) to Firestore
      const postDoc = doc(db, 'posts', snapshot.ref.name);  // Use image name as doc ID
      await setDoc(postDoc, {
        username: user.displayName || user.email.split('@')[0],
        email: user.email,
        imageUrl,
        datePosted,  // Store Firestore Timestamp
        likes: 0,  
      });

      console.log('Image uploaded successfully:', imageUrl);

      // Save post details for display
      setPostDetails({
        image: imageUrl,
        username: user.displayName || user.email.split('@')[0],
        datePosted,
        initialLikes: 0,
      });

      setSelectedImage(null);
      setPreviewImage(null);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Image upload failed:', error.message);
      setUploadError(error.message);
      alert('Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setUploadError(null);
  };

  return (
    <div className="createPost">
      <Navbar />
      <div className="creator">
        <h2 className="subheading">Upload a Photo</h2>
        <form onSubmit={handleImageUpload}>
          <label className="file-upload-label">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="image-preview" />
            ) : (
              <span className="placeholder">Click to choose a photo</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>

          <div className="button-group">
            <button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>

        {uploadError && <p className="error-message">{uploadError}</p>}
      </div>
      
      <div className="profileContent">
        <ProfileOverview />
      </div>

      {postDetails && <Post {...postDetails} />} {/* Pass post details to the Post component */}
    </div>
  );
};

export default CreatePost;
