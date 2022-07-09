import React from "react";
import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <nav>
      <h1 className="site-title"><Link to="/home">El-Instagram Clone</Link></h1>
      <ul className="profile-links">
        <li>Add pic</li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>Log Out</li>
      </ul>
    </nav>
  );
}

export default HomeNavbar;
