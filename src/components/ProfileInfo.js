import React, { useState } from "react";
import Profile from "./Profile";
import TilePictures from "./TilePictures";
import PictureSelectView from "./PictureSelectView";
import { Navigate } from "react-router-dom";

function ProfileInfo({ user }) {
  const [picUrl, setPicUrl] = useState("");
  const [deletePic, setDeletePic] = useState(false);

  if (user) {
    return (
      <div className="editable-profile">
        <Profile />
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
