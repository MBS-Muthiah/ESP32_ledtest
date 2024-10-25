// src/Login.js
import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "./firebase";
import './App.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onLogin(); // Trigger successful login action
      })
      .catch((error) => {
        setError("Failed to log in. Please check your credentials.");
      });
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);
      })
      .catch((error) => {
        setError("Failed to log out.");
      });
  };

  return (
    <div className="App">
      <h1>{auth.currentUser ? "Welcome" : "Login"}</h1>
      {error && <p className="error">{error}</p>}

      {auth.currentUser ? (
        // Show sign out button when user is logged in
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        // Show login form when user is not logged in
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
