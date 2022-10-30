import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline } from "@mdi/js";
import Comment from "./Comment";
import PostComment from "./PostComment";

function Post({ post }) {
  const [liked, setLiked] = useState(false);

  const styleLike = {
    color: liked ? "red" : "",
  };

  function postLiked() {
    setLiked((prevState) => !prevState);
  }

  const comments = post.comment?.map((post) => {
    return (
      <PostComment
        key={post.uid}
        userName={post.userName}
        message={post.message}
      />
    );
  });

  return (
    <div className="postContainer">
      <img
        className="postImage"
        src={post.picUrl}
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
        <h3>{post.userName}</h3>
        <p className="description-post">{post.captions}</p>
      </div>
      {comments}
      <Comment />
    </div>
  );
}

export default Post;
