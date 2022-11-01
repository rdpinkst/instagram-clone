import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Homepage({ user }) {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "post"), where("userId", "!=", user.uid));
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
    }
  }, [user, user.uid]);

  const postsView = postData?.map((post, index) => {
    return (
      <div key={index} className="content">
        <Post post={post} user={user} />
      </div>
    );
  });

  if (user) {
    return <div className="page">{postsView}</div>;
  }
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
}

export default Homepage;
