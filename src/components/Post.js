import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline } from "@mdi/js";
import Comment from "./Comment";
import PostComment from "./PostComment";

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
      <PostComment
        key={comment.uid}
        userName={comment.userName}
        message={comment.message}
      />
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
        <h3>{user.displayName}</h3>
        <p className="description-post">{postData.caption}</p>
      </div>
      {comments}
      <Comment />
    </div>
  );
}

export default Post;
