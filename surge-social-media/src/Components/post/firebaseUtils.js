import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageToFirebase = async (file) => {
    const storage = getStorage(); 
    const storageRef = ref(storage, 'images/' + file.name); 
  
    try {
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
  
      // Get the download URL after upload
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL; // Return the URL of the uploaded image
    } catch (error) {
      throw new Error('Image upload failed: ' + error.message); // Throw an error if upload fails
    }
  };
