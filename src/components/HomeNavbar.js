import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function HomeNavbar({ setUser }) {
  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser("");
        console.log("Logged Out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav>
      <h1 className="site-title">
        <Link className="link-style" to="/home">El-Instagram Clone</Link>
      </h1>
      <ul className="profile-links">
        <li>Add pic</li>
        <li className="profile-btn">
          <Link className="link-style" to="/profile">
            Profile
          </Link>
        </li>
        <li className="log-out" onClick={logOut}>
          Log Out
        </li>
      </ul>
    </nav>
  );
}

export default HomeNavbar;
