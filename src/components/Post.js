import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline } from "@mdi/js";
import Comment from "./Comment";

function Post({ postData, user }) {
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
        <Icon
          className="icon end"
          path={mdiHeartOutline}
          onClick={postLiked}
          style={styleLike}
        />
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

      <div className="one-line">
        <h3>{user.email}</h3>
        <p className="description-post">{postData.caption}</p>
      </div>
      {comments}
      <Comment />
    </div>
  );
}

export default Post;
