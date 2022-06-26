import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import gramPic from "../pictures/gram.jpg";
import "./Sign-in.css";

function SignIn({user, setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");


  const logIn = async(e) => {
    e.preventDefault();
    if(email && password){
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          console.log("logged on")
          console.log(userCredential)
        })
        .catch((error) => {
          setErrorMessage(error.message);
        })
    } else return;
  }

  return (
    <div className="signIn-page">
      {user?.email && (
        <Navigate to="/home" replace={true} />
      )}
      <div className="pic-gram">
        <img src={gramPic} alt="Phone with Instagram on." />
        <p className="photo-att">
          Photo by{" "}
          <a href="https://unsplash.com/@neonbrand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Kenny Eliason
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/social-media?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </p>
      </div>
      <div className="sign-in">
        <form className="sign" onSubmit={logIn}>
          <h1 className="title-form">El-Instagram Clone</h1>
          {errorMessage && <p>{errorMessage}</p>}
          <input
            className="sign-form"
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="sign-form"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="log-in" type="submit">
            Log in
          </button>
          <div className="guest-btn">
            <button className="guest-sign">Sign in as Guest</button>
          </div>
        </form>
        <div className="account-have">
          <p className="center-txt">
            Don't have an account? <Link to="/sign-up">Sign-up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
