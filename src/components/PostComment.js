import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline } from "@mdi/js";

function PostComment({ userName, message }) {
  const [liked, setLiked] = useState(false);

  function postLiked() {
    setLiked((prevState) => !prevState);
  }

  const styleLike = {
    color: liked ? "red" : "",
  };

  return (
    <div className="comment">
      <div className="profile-pic"></div>
      <p className="user">{userName}</p>
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
