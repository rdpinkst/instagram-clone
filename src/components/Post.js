import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline } from "@mdi/js";
import Comment from "./Comment";
import PostComment from "./PostComment";
import brokenPic from "../pictures/brokenLink.jpeg";

function Post({ post, user }) {
  const [liked, setLiked] = useState(false);

  const styleLike = {
    color: liked ? "red" : "",
  };

  function postLiked() {
    setLiked((prevState) => !prevState);
  }

  const comments = post.comments?.map((post) => {
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
        src={post.picUrl ? post.picUrl : brokenPic}
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
      <Comment post={post} user={user}/>
    </div>
  );
}

export default Post;
