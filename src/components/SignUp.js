import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase";

function SignUp({user, setUser}) {
  const [username, setUsername] = useState("")
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkPasswords = (set, confirm) => {
    return set === confirm;
  };

  const register = async (e) => {
    e.preventDefault();
    if (newEmail !== "" && checkPasswords(password, confirmPassword)) {
      createUserWithEmailAndPassword(auth, newEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: username,
          }).then(() => {
            setUser(user);
          }) 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ": " + errorMessage);
        });
    } else return;
  };

  return (
    <div className="sign-up">
      {user?.email && <Navigate to="/newuser" replace={true} />}
      <form className="create-user" onSubmit={register}>
        <h1 className="title-form">El Instagram Clone</h1>
        <p className="description-site">
          Sign up to see photos from friends and family.
        </p>
        <input
          className="sign-form"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="sign-form"
          type="email"
          placeholder="Email address"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          className="sign-form"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="sign-form"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="btn-signup" type="submit">
          Sign up
        </button>
      </form>
      <div className="account-have">
        <p className="center-txt">
          Have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
