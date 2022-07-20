import React from "react";

function PictureSelectView({ picUrl, setPicUrl }) {
  function clearPicUrl(){
    setPicUrl("");
  }
  return (
    <div className="selected-card">
      <div className="picture-container">
        <img className="selected-img" src={picUrl} alt="random pic" />
      </div>
      <span className="close-card" onClick={clearPicUrl}>x</span>
    </div>
  );
}

export default PictureSelectView;
