import React, { useState } from "react";
import AddPic from "./AddPic";

function NewUserInfo({ user }) {
  const [newUser, setNewUser] = useState(true);
  return (
    <div>
      <h1>Add A Profile Pic</h1>
      <AddPic user={user} newUser ={newUser} setNewUser={setNewUser}  />
    </div>
  );
}

export default NewUserInfo;
