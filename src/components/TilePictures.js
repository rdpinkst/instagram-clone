import React from "react";

function TilePictures({ setPicUrl, posts }) {
  const postedPics = posts.map((pic, index) => {
    return (
      <div
        key={index}
        className="individual-pic"
        onClick={() => setPicUrl(pic)}
      >
        <img src={pic.picUrl} alt="posted pic" className="trying-it"></img>
      </div>
    );
  });

  return <div className="pic-tile">{postedPics}</div>;
}

export default TilePictures;
