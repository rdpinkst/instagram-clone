import React from "react";
import Profile from "./Profile";

function ProfileInfo() {
  return (
    <div className="editable-profile">
      <Profile />
      <div className="user-info">
        <p >This is the info about person</p>
      </div>
      
    </div>
  );
}

export default ProfileInfo;
