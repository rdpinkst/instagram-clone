import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import "./Homepage.css";

function Homepage() {
  const [signedOut, setSignedOut] = useState(false);

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setSignedOut(true);
        console.log("Logged Out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="page">
      <HomeNavbar />
      {signedOut && <Navigate to="/" replace={true} />}
      <div className="content">
        <h1>Logged in</h1>
        <button onClick={logOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Homepage;
