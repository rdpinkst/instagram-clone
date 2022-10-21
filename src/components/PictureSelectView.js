import React, { useEffect } from "react";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiMessageOutline, mdiDotsHorizontal } from "@mdi/js";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { storage, db } from "../firebase.js";

function PictureSelectView({ picUrl, setPicUrl, user }) {
  function clearPicUrl() {
    setPicUrl("");
  }
  function deletePic() {
    if (picUrl.userId === user.uid) {
      const deleteRef = ref(storage, picUrl.picUrl);

      deleteObject(deleteRef)
        .then(() => {
          const docRef = doc(db, "post", picUrl.id);
          deleteDoc(docRef)
            .then(() => {
              console.log("deleted");
              setPicUrl("");
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
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
        <Icon
          className="icon bottom-right"
          onClick={deletePic}
          path={mdiDotsHorizontal}
          size={1.1}
        />
      </div>
    </div>
  );
}

export default PictureSelectView;
