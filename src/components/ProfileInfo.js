import React from "react";
import Profile from "./Profile";
import TilePictures from "./TilePictures";
import {Navigate} from "react-router-dom";

function ProfileInfo({ user }) {
  if (user) {
    return (
      <div className="editable-profile">
        <Profile />
        <div className="user-personal">
          <p>This is the info about person</p>
          <button className="log-in">Edit Profile</button>
        </div>
        <TilePictures />
      </div>
    );
  }
  if(!user){
    return <Navigate to="/" replace={true} />;
  }
}

export default ProfileInfo;
