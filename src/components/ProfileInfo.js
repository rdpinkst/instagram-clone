import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import TilePictures from "./TilePictures";
import PictureSelectView from "./PictureSelectView";
import {
  query,
  onSnapshot,
  where,
  collection,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { Navigate } from "react-router-dom";

function ProfileInfo({ user, updateBio, setUpdateBio, profileToView }) {
  const [picUrl, setPicUrl] = useState("");
  const [deletePic, setDeletePic] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      //onSnapshot firebase to get all post made my user
      const q = query(
        collection(db, "post"),
        orderBy("timeStamp", "desc"),
        where("userName", "==", profileToView)
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log("running");
          const postsArr = [];
          snapshot.forEach((doc) => {
            postsArr.push({ ...doc.data() });
          });
          setPosts(postsArr);
        },
        (error) => {
          console.log(error.message);
        }
      );
      return () => unsubscribe();
    }
  }, [user, profileToView]);

  function update(e) {
    console.log(e.target.innerHTML);
    if(e.target.innerHTML === "Edit Profile"){
      setUpdateBio((prevState) => !prevState);
    } else {
      //add to followers
      //add to following
      console.log("following");
    }
    
  }

  if (user) {
    return (
      <div className="editable-profile">
        {updateBio && <Navigate to="/addpic" replace={true} />}
        <Profile user={user} />
        <div className="user-personal">
          <p>This is the info about person</p>
          <div className="center-btn">
            <button className="log-in full-width" onClick={update}>
              {user.displayName === profileToView ? "Edit Profile" : "Follow"}
            </button>
          </div>
        </div>
        <TilePictures
          setPicUrl={setPicUrl}
          picUrl={picUrl}
          deletePic={deletePic}
          setDeletePic={setDeletePic}
          posts={posts}
        />
        {picUrl ? (
          <PictureSelectView
            picUrl={picUrl}
            setPicUrl={setPicUrl}
            setDeletePic={setDeletePic}
            posts={posts}
            user={user}
          />
        ) : null}
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
}

export default ProfileInfo;
