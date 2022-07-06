import React from "react";

function Profile() {
  return (
    <div className="user-info">
        <div className="profile-pic bigger-pic">
            <span className="no-pic">No Image</span>
            <div className="add-pic">
                <span className="add">+</span>
            </div>
        </div>
        <div className="post-data">
            <div className="data">
                <p className="number">#</p>
                <p className="data-name">Posts</p>
            </div>
            <div className="data">
                <p className="number">#</p>
                <p className="data-name">Posts</p>
            </div>
            <div className="data">
                <p className="number">#</p>
                <p className="data-name">Posts</p>
            </div>
        </div>
    </div>
  );
}

export default Profile;
