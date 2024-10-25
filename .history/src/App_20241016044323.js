// src/App.js
import React, { useState, useEffect } from "react";
import { db, ref, set, onValue } from "./firebase";
import Login from "./Login";
import './App.css'; // Importing the CSS file
import { auth } from "./firebase"; // Add this line


function App() {
  const [ledStatus, setLedStatus] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    
    return () => unsubscribe();  // Cleanup listener
  }, []);
  

  // Write the LED state to Firebase
  const updateLedState = (state) => {
    set(ref(db, "/state"), state);
  };

  // Listen for LED state changes from Firebase
  useEffect(() => {
    if (isAuthenticated) {
      const stateRef = ref(db, "/state");
      onValue(stateRef, (snapshot) => {
        const data = snapshot.val();
        setLedStatus(data);
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="App">
      <h1>ESP32 LED Control</h1>
      <p>LED is {ledStatus === 1 ? "ON" : "OFF"}</p>
      <button onClick={() => updateLedState(1)} disabled={ledStatus === 1}>
        Turn ON
      </button>
      <button onClick={() => updateLedState(0)} disabled={ledStatus === 0}>
        Turn OFF
      </button>
    </div>
  );
}

export default App;
