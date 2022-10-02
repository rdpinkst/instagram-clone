import React from "react";
import AddPic from "./AddPic";

function NewUserInfo({ user }) {
  return (
    <div>
      <h1>Add A Profile Pic</h1>
      <AddPic user={user} />
    </div>
  );
}

export default NewUserInfo;
