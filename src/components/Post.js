import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline } from "@mdi/js";
import Comment from "./Comment";
import PostComment from "./PostComment";
import brokenPic from "../pictures/brokenLink.jpeg";

function Post({ post, user, setProfileToView }) {
  const [liked, setLiked] = useState(false);

  const styleLike = {
    color: liked ? "red" : "",
  };

  function postLiked() {
    setLiked((prevState) => !prevState);
  }

  function viewProfile() {
    setProfileToView(post.userName);
  }

  const comments = post.comments?.map((post) => {
    return (
      <PostComment
        key={post.uid}
        userName={post.userName}
        message={post.message}
        setProfileToView={setProfileToView}
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
        <h3>
          <Link to="/profile" onClick={viewProfile}>
            {post.userName}
          </Link>
        </h3>
        <p className="description-post">{post.captions}</p>
      </div>
      {comments}
      <Comment post={post} user={user} setProfileToView={setProfileToView} />
    </div>
  );
}

export default Post;
