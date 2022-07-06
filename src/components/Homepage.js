import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";
import Post from "./Post";

const firstPost = {
  uid: 1,
  picUrl: "hola.jpg",
  caption: "This is the first post",
  comments: [
    { userName: "James", message: "Awesome Post", uid: 1 },
    { userName: "Jamie", message: "Awesome Post, learning spanish too", uid:2 },
  ],
  likes: ["James", "Jamie", "Charles", "Shawn"]
};

function Homepage({ user, setUser }) {
  const [signedOut, setSignedOut] = useState(false);
  const [postData, setPostData] = useState(firstPost);

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        setUser({});
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
        <Post postData={postData} />
        <h1>{user.email} is Logged in</h1>
        <button onClick={logOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Homepage;
