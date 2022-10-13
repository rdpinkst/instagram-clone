import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import TilePictures from "./TilePictures";
import PictureSelectView from "./PictureSelectView";
import { doc, query, onSnapshot, where, collection} from "firebase/firestore";
import { db } from "../firebase";
import { Navigate } from "react-router-dom";

function ProfileInfo({ user }) {
  const [picUrl, setPicUrl] = useState("");
  const [deletePic, setDeletePic] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //onSnapshot firebase to get all post made my user
    
    const q = query(collection(db, "post"), where("userId", "==", `${user.uid}`));
    console.log(q)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("running")
      const postsArr = [];
      console.log(snapshot)
      snapshot.foreach(doc => {
        postsArr.push(doc.data());
      })
      setPosts(postsArr);
    }, 
    (error) => {
      console.log(error.message);
    })

    unsubscribe();
  }, [user.uid])

  if (user) {
    return (
      <div className="editable-profile">
        <Profile user={user}/>
        <div className="user-personal">
          <p>This is the info about person</p>
          <div className="center-btn">
            <button className="log-in full-width">Edit Profile</button>
          </div>
        </div>
        <TilePictures
          setPicUrl={setPicUrl}
          picUrl={picUrl}
          deletePic={deletePic}
          setDeletePic={setDeletePic}
        />
        {picUrl ? (
          <PictureSelectView
            picUrl={picUrl}
            setPicUrl={setPicUrl}
            setDeletePic={setDeletePic}
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
