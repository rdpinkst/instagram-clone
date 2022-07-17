import React, {useEffect} from "react";
import { Link, Navigate } from "react-router-dom";


function HomeNavbar({ logOut, signedOut }) {
  // if (signedOut) {
  //     return <Navigate to="/" replace={true} />;
  //   }
  useEffect(() => {
    if (signedOut) {
      return <Navigate to="/" replace={true} />;
    }
  }, [signedOut]);

  return (
    <nav>
      <h1 className="site-title">
        <Link to="/home">El-Instagram Clone</Link>
      </h1>
      <ul className="profile-links">
        <li>Add pic</li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li onClick={logOut}>Log Out</li>
      </ul>
    </nav>
  );
}

export default HomeNavbar;
