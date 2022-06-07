import React from "react";
import "./SignUp.css";

function SignUp() {
  return (
    <div className="sign-up">
        <form className="create-user">
        <h1 className="title-form">El Instagram Clone</h1>
        <p className="description-site">Sign up to see photos from friends and family.</p>
        <input
            className="sign-form"
            type="email"
            placeholder="Email address"
          />
          <input className="sign-form" type="password" placeholder="Password" />
          <input className="sign-form" type="password" placeholder="Confirm Password" />
          <button className="btn-signup" type="submit">
            Sign up
          </button>
        </form>
      <div className="account-have">
        <p className="center-txt">
          Have an account? <span>Log in</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
