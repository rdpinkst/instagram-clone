import React, { useState } from "react";
import Profile from "./Profile";
import TilePictures from "./TilePictures";
import PictureSelectView from "./PictureSelectView";
import { Navigate } from "react-router-dom";

function ProfileInfo({ user }) {
  const [picUrl, setPicUrl] = useState("");
  // const backgroundStyle = {
  //   opacity: picUrl ? "0.3" : "1",
  // }

  if (user) {
    return (
      <div className="editable-profile" >
        {/* {picUrl && <PictureSelectView picUrl={picUrl} />} */}
        <Profile />
        <div className="user-personal">
          <p>This is the info about person</p>
          <div className="center-btn">
            <button className="log-in full-width">Edit Profile</button>
          </div>
          
        </div>
        <TilePictures setPicUrl={setPicUrl} />
        {picUrl ? <PictureSelectView picUrl={picUrl} setPicUrl={setPicUrl} /> : null}
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
}

export default ProfileInfo;
