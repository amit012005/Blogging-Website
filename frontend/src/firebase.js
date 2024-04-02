// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import env from "react-dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(env.FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyBA5iZXDcwdDV4luo66K-gi6tf2WzWqgXU",
  authDomain: "blog-386e4.firebaseapp.com",
  projectId: "blog-386e4",
  storageBucket: "blog-386e4.appspot.com",
  messagingSenderId: "768715577966",
  appId: "1:768715577966:web:1a4bcf80deb750a82c247f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
