import React from "react";

function Post( {postData} ) {

    const comments = postData.comments.map(comment => {
        return (
            <div key={comment.uid}>
                <p>{comment.userName}</p>
                <p>{comment.message}</p>
            </div>
        )
    })

    return (
        <div className="postContainer">
            <img className="postImage" src={`/${postData.picUrl}`} alt="spanish learning" />
            <p>{postData.caption}</p>
            {comments}
        </div>
    )
}

export default Post;