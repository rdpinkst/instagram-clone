import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { query, where, collection, onSnapshot } from "firebase/firestore";
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
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "post"),
      where("userId", "!=", user.uid)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("running");
        const postsArr = [];
        snapshot.forEach((doc) => {
          postsArr.push({ ...doc.data() });
        });
        setPostData(postsArr);
      },
      (error) => {
        console.log(error.message);
      }
    );
    return () => unsubscribe();
  }, [user.uid])

  if (user) {
    return (
      <div className="page">
        <div className="content">
          <Post postData={postData} user={user} />
        </div>
      </div>
    );
  }
  if(!user){
    return <Navigate to="/" replace={true} />;
  }
}

export default Homepage;
