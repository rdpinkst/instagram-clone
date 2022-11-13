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
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { Navigate } from "react-router-dom";

function ProfileInfo({ user, updateBio, setUpdateBio, profileToView, userInfo }) {
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
      const q = query(
                collection(db, "users"),
                where("userName", "==", profileToView));
                console.log(q)
      getDocs(q)  
      .then((docs) => {
        docs.forEach((document) => {
          console.log(document.id)
          const userRef = doc(db, "users", document.id);
          updateDoc(userRef, {
            followers: [user.displayName],
          }).then(() => {
          console.log("New follower");
          }).catch((error) => {
            console.log(error.message);
          })
        })
        
      })
      // updateDoc(q, {
      //   followers: [user.displayName]
      // }).then(() => {
      //   console.log("Following");
      // }).catch((error) => {
      //   console.log(error.message);
      // })
      //add to followers
      //add to following
      const userRef = doc(db, "users", userInfo.id);

      updateDoc(userRef, {
        following: [profileToView],
      }).then(() => {
        console.log("Following " + profileToView);
      }).catch((error) => {
        console.log(error.message);
      })
      console.log("following");
    }
    
  }

  if (user) {
    return (
      <div className="editable-profile">
        {updateBio && <Navigate to="/addpic" replace={true} />}
        <Profile user={user} userInfo={userInfo}/>
        <div className="user-personal">
          <p>{userInfo.bio}</p>
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
