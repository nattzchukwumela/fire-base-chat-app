// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD5zTgUeyZLviHQG9cPSRTwQ1sbuGbq3I",
  authDomain: "chat-app-475f4.firebaseapp.com",
  projectId: "chat-app-475f4",
  storageBucket: "chat-app-475f4.appspot.com",
  messagingSenderId: "853787564295",
  appId: "1:853787564295:web:6bdc7d0cb689b030c04da2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
