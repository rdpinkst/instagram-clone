import React from "react";

function Comment(){
    return (
        <form className="comment-container">
            <textarea className="comment-description" />
            <button className="log-in" style={{marginTop: "0"}}>Submit</button>
        </form>
    )
}

export default Comment;