import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiHeartOutline } from "@mdi/js";

function PostComment({ userName, message, setProfileToView }) {
  const [liked, setLiked] = useState(false);

  function postLiked() {
    setLiked((prevState) => !prevState);
  }

  function viewProfile() {
    setProfileToView(userName);
  }

  const styleLike = {
    color: liked ? "red" : "",
  };

  return (
    <div className="comment">
      <div className="profile-pic"></div>
      <p className="user">
        <Link to="/profile" onClick={viewProfile}>
          {userName}
        </Link>
      </p>
      <p>{message}</p>
      <Icon
        className="icon end"
        path={mdiHeartOutline}
        size={1.1}
        onClick={postLiked}
        style={styleLike}
      />
    </div>
  );
}

export default PostComment;
