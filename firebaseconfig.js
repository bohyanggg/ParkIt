// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkqAQBy9HTOrUEsADQcEEbbLslNASz8wM",
  authDomain: "parkit-b1043.firebaseapp.com",
  projectId: "parkit-b1043",
  storageBucket: "parkit-b1043.appspot.com",
  messagingSenderId: "1005619863255",
  appId: "1:1005619863255:web:7ae1bcb4ad6ec34fde9a92",
  measurementId: "G-GSE5HZ2T8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getfirestore(app);

export { auth, firestore };