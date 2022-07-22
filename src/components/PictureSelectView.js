import React from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline } from "@mdi/js";

function PictureSelectView({ picUrl, setPicUrl }) {
  function clearPicUrl() {
    setPicUrl("");
  }
  return (
    <div className="selected-card">
      <div className="picture-container">
        <img className="selected-img" src={picUrl} alt="random pic" />
      </div>
      <div className="content-pic">
        <span className="close-card" onClick={clearPicUrl}>
          x
        </span>
        <div className="like-comment card-comment">
          <Icon className="icon" path={mdiHeartOutline} size={1.1} />
          <Icon className="icon" path={mdiMessageOutline} size={1.1} />
        </div>
        <p className="bold-text">This is the information about the picture</p>
        <div className="comment">
          <div className="profile-pic"></div>
          <p className="user">Users Name</p>
          <p>This is a random comment</p>
        </div>
      </div>
    </div>
  );
}

export default PictureSelectView;
