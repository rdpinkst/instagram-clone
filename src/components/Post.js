import React from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiHeart, mdiMessageOutline } from "@mdi/js";
import Comment from "./Comment";
import PostComment from "./PostComment";
import brokenPic from "../pictures/brokenLink.jpeg";
import { db } from "../firebase";

function Post({ post, user, setProfileToView }) {
  function postLiked() {
    const postRef = doc(db, "post", post.id);
    if (!post.likes.includes(user.displayName)) {
      updateDoc(postRef, {
        likes: [...post.likes, user.displayName],
      })
        .then(() => {
          console.log("updated comments");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      updateDoc(postRef, {
        likes: removeUsersLike(user.displayName),
      })
        .then(() => {
          console.log("updated comments");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  function removeUsersLike(userName) {
    const likeArray = [...post.likes];
    let index = likeArray.indexOf(userName);
    likeArray.splice(index, 1);
    return likeArray;
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
        { post.likes.length === 0 ?
        <Icon
          className="icon"
          path={mdiHeartOutline}
          size={1.1}
          onClick={postLiked}
        />:
        <Icon
          className="icon redHeart"
          path={mdiHeart}
          size={1.1}
          onClick={postLiked}
        />
}
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
