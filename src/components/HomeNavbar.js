import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function HomeNavbar({ user, setUser, updateBio, setUpdateBio, setProfileToView }) {
  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser("");
        setUpdateBio(false);
        console.log("Logged Out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  function clickLink() {
    if(updateBio){
      setUpdateBio(prevState => !prevState);
    }
    setProfileToView(user.displayName);
    
  }

  return (
    <nav>
      <h1 className="site-title">
        <Link className="link-style" to="/home" onClick={clickLink}>
          El-Instagram Clone
        </Link>
      </h1>
      <ul className="profile-links">
        <li>
          <Link className="link-style" to="/addpic" onClick={clickLink}>
            Add pic
          </Link>
        </li>
        <li className="profile-btn">
          <Link className="link-style" to="/profile" onClick={clickLink}>
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
