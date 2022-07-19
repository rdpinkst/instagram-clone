import React from "react";

function PictureSelectView({picUrl}){
    return (
        <div className="selected-card">
            <img className="selected-img" src={picUrl} alt="random pic" />
        </div>
    )
}

export default PictureSelectView;