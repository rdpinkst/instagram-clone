import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Comment({ post, user }) {
  const [comment, setComment] = useState("");

  const styleButton = {
    backgroundColor: comment ? "#467fd0" : "#fff",
    color: comment ? "#fff" : "#467fd0",
    cursor: comment ? "pointer" : "default",
  };

  function updatePost(e) {
    e.preventDefault();
    const postRef = doc(db, "post", post.id);

    updateDoc(postRef, {
      comments: [
        ...post.comments,
        { userName: user.displayName, message: comment },
      ],
    }).then(() => {
      console.log("updated comments");
      setComment("");
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <form className="comment-container" onSubmit={updatePost}>
      <input
        type="text"
        className="comment-description"
        placeholder="Add a comment..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button className="log-in submit-comment" style={styleButton}>
        Submit
      </button>
    </form>
  );
}

export default Comment;
