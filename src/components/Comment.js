import React, { useState } from "react";

function Comment() {
  const [comment, setComment] = useState("");

  return (
    <form className="comment-container">
      <textarea
        className="comment-description"
        onChange={(e) => setComment(e.target.value)}
      />
      {comment && (
        <button className="log-in" style={{ marginTop: "0" }}>
          Submit
        </button>
      )}
    </form>
  );
}

export default Comment;
