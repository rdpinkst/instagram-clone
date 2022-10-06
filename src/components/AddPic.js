import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiUpload } from "@mdi/js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, collection, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { storage, auth, db } from "../firebase.js";

function AddPic({ user, setUser, updateBio, setUpdateBio }) {
  const [picUpload, setPicUpload] = useState("");
  const [inputInfo, setInputInfo] = useState("");

  function getPicUrl(e) {
    const filePic = e.target.files[0];
    const picUrl = URL.createObjectURL(filePic);
    setPicUpload(picUrl);
    const storageRef = ref(storage, filePic.name);
    //uploaded pic
    uploadBytes(storageRef, filePic).then((snapshot) => {
      console.log("Uploaded");
      getDownloadURL(storageRef).then((url) => {
        if (updateBio) {
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              setUser(auth.currentUser);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
        //Need an else statement for when adding new post adding uid, picURL, caption, comment array
        //likes array and userName
        else {
          const postRef = doc(collection(db, "post"));
          setDoc(postRef, {
            userId: user.uid,
            picUrl: url,
            userName: user.displayName,
          }).then(() => {
            console.log("Document Set")
          }).catch((error) => {
            console.log(error.message)
          })
        }
      });
    });
  }

  if (user) {
    return (
      <div>
        <h1>{updateBio ? "Update Profile Pic and Bio" : "Add a New Post"}</h1>
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
                {updateBio ? "Bio: " : "Description: "}
              </label>
              <textarea
                id="description"
                type="text"
                onChange={(e) => setInputInfo(e.target.value)}
              />
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
