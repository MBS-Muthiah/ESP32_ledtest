// src/App.js
import React, { useState, useEffect } from "react";
import { db, ref, set, onValue } from "./firebase";
import Login from "./Login";
import './App.css';
import { auth } from "./firebase";

function App() {
  const [fanStatus, setFanStatus] = useState(0);
  const [lightStatus, setLightStatus] = useState(0);
  const [ledStatus, setLedStatus] = useState(0);  // New state for onboard LED
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

  // Write the Fan, Light, and LED states to Firebase
  const updateDeviceState = (device, state) => {
    set(ref(db, `/${device}`), state);
  };

  // Listen for Fan, Light, and LED state changes from Firebase
  useEffect(() => {
    if (isAuthenticated) {
      const fanRef = ref(db, "/fan");
      onValue(fanRef, (snapshot) => {
        const data = snapshot.val();
        setFanStatus(data);
      });

      const lightRef = ref(db, "/light");
      onValue(lightRef, (snapshot) => {
        const data = snapshot.val();
        setLightStatus(data);
      });

      const ledRef = ref(db, "/led");
      onValue(ledRef, (snapshot) => {
        const data = snapshot.val();
        setLedStatus(data);
      });
    }
  }, [isAuthenticated]);

  // Handle user logout
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("Failed to log out:", error);
      });
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="App">
      <h1>ESP32 Device Control</h1>
      <button className="logout-button" onClick={handleLogout}>Sign Out</button>
      
      <div className="device-control">
        <h2>Fan Control</h2>
        <p>Fan is {fanStatus === 1 ? "ON" : "OFF"}</p>
        <button onClick={() => updateDeviceState("fan", 1)} disabled={fanStatus === 1}>
          Turn ON
        </button>
        <button onClick={() => updateDeviceState("fan", 0)} disabled={fanStatus === 0}>
          Turn OFF
        </button>
      </div>

      <div className="device-control">
        <h2>Light Control</h2>
        <p>Light is {lightStatus === 1 ? "ON" : "OFF"}</p>
        <button onClick={() => updateDeviceState("light", 1)} disabled={lightStatus === 1}>
          Turn ON
        </button>
        <button onClick={() => updateDeviceState("light", 0)} disabled={lightStatus === 0}>
          Turn OFF
        </button>
      </div>

      <div className="device-control">
        <h2>Onboard LED Control</h2>
        <p>LED is {ledStatus === 1 ? "ON" : "OFF"}</p>
        <button onClick={() => updateDeviceState("led", 1)} disabled={ledStatus === 1}>
          Turn ON
        </button>
        <button onClick={() => updateDeviceState("led", 0)} disabled={ledStatus === 0}>
          Turn OFF
        </button>
      </div>
    </div>
  );
}

export default App;
