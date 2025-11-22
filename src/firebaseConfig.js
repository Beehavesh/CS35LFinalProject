// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUN5OIhCnwR-SDbLUkwsqObdB1XUK8Rjc",
  authDomain: "linkedout-96f37.firebaseapp.com",
  projectId: "linkedout-96f37",
  storageBucket: "linkedout-96f37.firebasestorage.app",
  messagingSenderId: "823862422829",
  appId: "1:823862422829:web:d0eb728df1f1d7d242b7a4",
  measurementId: "G-MT4BHZJ37K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);