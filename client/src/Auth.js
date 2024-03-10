import React, { useState } from "react";
import "./index.css"; // Ensure this path is correct

// Firebase imports - Modular SDK
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYUeermMIVuchrVj6QCZIH1RFgL8NsJ48",
  authDomain: "skyparcelauth.firebaseapp.com",
  projectId: "skyparcelauth",
  storageBucket: "skyparcelauth.appspot.com",
  messagingSenderId: "177680051610",
  appId: "1:177680051610:web:728cbc0a616540fc005e23",
  measurementId: "G-PE0F4XP22E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const Auth = () => {
  // State hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Validation functions...
  // Ensure your validation functions are defined here (omitted for brevity)
  const validate_email = (email) => {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(String(email).toLowerCase());
  };

  const validate_password = (password) => {
    return password.length > 6;
  };

  const validate_field = (field) => {
    return field !== null && field.length > 0;
  };

  const register = () => {
    if (!validate_email(email) || !validate_password(password)) {
      alert("Email or Password is Outta Line!!");
      return;
    }
    if (!validate_field(fullName)) {
      alert("One or More Extra Fields is Outta Line!!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(database, "users/" + user.uid), {
          email: email,
          full_name: fullName,
          last_login: Date.now(),
        });
        alert("User Created!!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const login = () => {
    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
      alert("Email or Password is Outta Line!!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        update(ref(database, "users/" + user.uid), {
          last_login: Date.now(),
        });
        alert("User Logged In!!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div id="content_container">
      <div id="form_container">
        <div id="form_header_container">
          <h2 id="form_header">Login to SkyParcel</h2>
        </div>

        <div id="form_content_container">
          <div id="form_content_inner_container">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />

            <div id="button_container">
              <button onClick={login}>Login</button>
              <button onClick={register}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
