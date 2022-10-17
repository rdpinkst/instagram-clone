import React from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline, mdiDotsHorizontal } from "@mdi/js";

function PictureSelectView({ picUrl, setPicUrl, setDeletePic, posts }) {
  function clearPicUrl() {
    setPicUrl("");
  }
  function deletePic(){
    setDeletePic(true);
  }
  return (
    <div className="selected-card">
      <div className="picture-container">
        <img className="selected-img" src={picUrl.picUrl} alt="random pic" />
      </div>
      <div className="content-pic">
        <span className="close-card" onClick={clearPicUrl}>
          x
        </span>
        <div className="like-comment card-comment">
          <Icon className="icon" path={mdiHeartOutline} size={1.1} />
          <Icon className="icon" path={mdiMessageOutline} size={1.1} />
        </div>
        <p className="bold-text">{picUrl.captions}</p>
        <div className="comment">
          <div className="profile-pic"></div>
          <p className="user">Users Name</p>
          <p>{picUrl.captions}</p>
        </div>
        <Icon className="icon bottom-right" onClick={deletePic} path={mdiDotsHorizontal} size={1.1} />
      </div>
    </div>
  );
}

export default PictureSelectView;
