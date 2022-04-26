// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHVw3nEq7C0w5-ij5Etr4THAFZRLAOsEc",
  authDomain: "to-gather-804d0.firebaseapp.com",
  projectId: "to-gather-804d0",
  storageBucket: "to-gather-804d0.appspot.com",
  messagingSenderId: "832419807230",
  appId: "1:832419807230:web:1cf841ef6ad9325002caaf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
