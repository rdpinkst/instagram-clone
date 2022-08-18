import React, { useState } from "react";

function Comment() {
  const [comment, setComment] = useState("");
  const styleButton = {
    backgroundColor: comment ? "#467fd0" : "#fff",
    color: comment ? "#fff" : "#467fd0",
    cursor: comment ? "pointer" : "default",
  }

  return (
    <form className="comment-container">
      <textarea
        className="comment-description"
        onChange={(e) => setComment(e.target.value)}
      />
        <button className="log-in submit-comment" style={styleButton}>
          Submit
        </button>
      
    </form>
  );
}

export default Comment;
