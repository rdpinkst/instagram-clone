import React, { useState } from "react";
import Profile from "./Profile";
import TilePictures from "./TilePictures";
import PictureSelectView from "./PictureSelectView";
import { Navigate } from "react-router-dom";

function ProfileInfo({ user }) {
  const [picUrl, setPicUrl] = useState("");

  if (user) {
    return (
      <div className="editable-profile">
        <Profile />
        <div className="user-personal">
          <p>This is the info about person</p>
          <button className="log-in">Edit Profile</button>
        </div>
        <TilePictures setPicUrl={setPicUrl} />
        {picUrl && <PictureSelectView picUrl={picUrl} />}
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
}

export default ProfileInfo;
