// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "parkit-3d4ad.firebaseapp.com",
  projectId: "parkit-3d4ad",
  storageBucket: "parkit-3d4ad.appspot.com",
  messagingSenderId: "503067931532",
  appId: "1:503067931532:web:429453e63e4aacde54dca9",
  measurementId: "G-D303494X84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };