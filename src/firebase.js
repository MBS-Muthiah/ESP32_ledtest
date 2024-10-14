// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBo7xYupTQf5AP7LDcFv_l65KJR8MvPiws",
    authDomain: "testled-bafbe.firebaseapp.com",
    databaseURL: "https://testled-bafbe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "testled-bafbe",
    storageBucket: "testled-bafbe.appspot.com",
    messagingSenderId: "969937171844",
    appId: "1:969937171844:web:6e014c35d8e733e78599d1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, ref, set, onValue, auth, signInWithEmailAndPassword, signOut };