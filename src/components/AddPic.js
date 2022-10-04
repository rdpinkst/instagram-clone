import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiUpload } from "@mdi/js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage, auth } from "../firebase.js"

function AddPic({ user, newUser, setNewUser, setUser }) {
  const [picUpload, setPicUpload] = useState("");

  function getPicUrl(e) {
    const filePic = e.target.files[0];
    const picUrl = URL.createObjectURL(filePic); 
    setPicUpload(picUrl);
    const storageRef = ref(storage, filePic.name);
    //uploaded pic
    uploadBytes(storageRef, filePic).then((snapshot) => {
      console.log("Uploaded")
      getDownloadURL(storageRef).then((url) => {
        if(newUser){
        updateProfile(auth.currentUser, {
          photoURL: url,
        }).then(() => {
          setUser(auth.currentUser);
          setNewUser(prevState => !prevState);
        }).catch((error) => {
          console.log(error);
        })
      }
      })
    })
    
  }


  if (user) {
    return (
      <div>
        {!picUpload && (
          <div
            className="preview border add-photo"
            onClick={() => document.getElementById("get-pic").click()}
          >
            <Icon path={mdiUpload} size={10} style={{ opacity: "0.8" }} />
            <input
              id="get-pic"
              onChange={getPicUrl}
              type="file"
              style={{ display: "none" }}
            />
          </div>
        )}

        {picUpload && (
          <div className="preview">
            <img className="selected-img" src={picUpload} alt="pic to upload" />
            <form className="form-picdesc">
              <label htmlFor="description" className="desc-bold">
                Description:{" "}
              </label>
              <textarea id="description" type="text" />
            </form>
            <button className="btn-signup full-width">Submit</button>
          </div>
        )}
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
}

export default AddPic;
