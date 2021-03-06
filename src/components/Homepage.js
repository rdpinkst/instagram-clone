import React, { useState } from "react";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Post from "./Post";

const firstPost = {
  uid: 1,
  picUrl: "hola.jpg",
  caption: "This is the first post",
  comments: [
    { userName: "James", message: "Awesome Post", uid: 1 },
    {
      userName: "Jamie",
      message: "Awesome Post, learning spanish too",
      uid: 2,
    },
  ],
  likes: ["James", "Jamie", "Charles", "Shawn"],
};

function Homepage({ user }) {
  const [postData, setPostData] = useState(firstPost);

  if (user) {
    return (
      <div className="page">
        <div className="content">
          <Post postData={postData} />
          <h1>{user.email} is Logged in</h1>
        </div>
      </div>
    );
  }
  if(!user){
    return <Navigate to="/" replace={true} />;
  }
}

export default Homepage;
