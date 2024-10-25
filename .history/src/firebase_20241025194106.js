// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6JxglAgI9ucG35JegLdatH53GJLdIm9w",
  authDomain: "protoautomation-fe04d.firebaseapp.com",
  projectId: "protoautomation-fe04d",
  storageBucket: "protoautomation-fe04d.appspot.com",
  messagingSenderId: "337214175670",
  appId: "1:337214175670:web:f24a39883cdcde00c86917"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, ref, set, onValue, auth, signInWithEmailAndPassword, signOut };