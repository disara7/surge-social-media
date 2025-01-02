// firebase.js (or firebaseConfig.js)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlb7eoH8aYma-yOU-ZXizsjOqFAv4tOj8",
    authDomain: "surge-social-media.firebaseapp.com",
    projectId: "surge-social-media",
    storageBucket: "surge-social-media.firebasestorage.app",
    messagingSenderId: "957654347338",
    appId: "1:957654347338:web:008f12db730ef2b3e700b3"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
