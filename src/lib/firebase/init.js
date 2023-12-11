// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud-dhurhan.firebaseapp.com",
  projectId: "cloud-dhurhan",
  storageBucket: "cloud-dhurhan.appspot.com",
  messagingSenderId: "292448502467",
  appId: "1:292448502467:web:9534f74ea0e90a3c52d876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app

