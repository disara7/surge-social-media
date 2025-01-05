import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const signInUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const createUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const saveUserData = async (userId, data) => {
  await setDoc(doc(db, 'users', userId), data);
};

export const uploadProfilePicture = async (file, userId) => {
  const storage = getStorage();
  const storageRef = ref(storage, `profile_pictures/${userId}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await setDoc(doc(db, 'users', userId), {
      picture: downloadURL
    }, { merge: true });

    console.log("Profile picture uploaded and Firestore updated!");

  } catch (error) {
    console.error("Error uploading profile picture: ", error);
    
    throw error;
  }
};
