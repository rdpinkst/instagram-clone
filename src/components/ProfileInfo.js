import React from "react";
import Profile from "./Profile";
import TilePictures from "./TilePictures";

function ProfileInfo({ user }) {
  if (user) {
    return (
      <div className="editable-profile">
        <Profile />
        <div className="user-personal">
          <p>This is the info about person</p>
        </div>
        <TilePictures />
      </div>
    );
  }
}

export default ProfileInfo;
