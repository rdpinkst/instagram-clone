import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline } from "@mdi/js";

function Post({ postData }) {
  const [liked, setLiked] = useState(false);

  const styleLike = {
    color: liked ? "red" : "",
  };

  function postLiked() {
    setLiked((prevState) => !prevState);
  }

  const comments = postData.comments.map((comment) => {
    return (
      <div key={comment.uid} className="comment">
        <div className="profile-pic"></div>
        <p className="user">{comment.userName}</p>
        <p>{comment.message}</p>
      </div>
    );
  });

  return (
    <div className="postContainer">
      <img
        className="postImage"
        src={`/${postData.picUrl}`}
        alt="spanish learning"
      />
      <div className="like-comment">
        <Icon
          className="icon"
          path={mdiHeartOutline}
          size={1.1}
          onClick={postLiked}
          style={styleLike}
        />
        <Icon className="icon" path={mdiMessageOutline} size={1.1} />
      </div>

      <p className="description-post">{postData.caption}</p>
      {comments}
    </div>
  );
}

export default Post;
