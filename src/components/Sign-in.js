import React from "react";
import gramPic from "../pictures/gram.jpg"
import "./Sign-in.css";

function SignIn() {
  return (
    <div className="signIn-page">
      <div className="pic-gram">
          <img src={gramPic} alt="Phone with Instagram on."/>
          <p className="photo-att">Photo by <a href="https://unsplash.com/@neonbrand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kenny Eliason</a> on <a href="https://unsplash.com/s/photos/social-media?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </p>
      </div>
      <form className="sign-in">
        <h1 className="title-form">El-Instagram Clone</h1>
        <input className="sign-form" type="email" placeholder="Email address" />
        <input className="sign-form" type="password" placeholder="Password" />
        <button className="log-in" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default SignIn;
