import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiUpload } from "@mdi/js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { storage, auth, db } from "../firebase.js";

function AddPic({
  user,
  setUser,
  newBio,
  setNewBio,
  updateBio,
  setUpdateBio,
  setUserInfo,
  userInfo,
}) {
  const [picUpload, setPicUpload] = useState("");
  const [inputInfo, setInputInfo] = useState("");
  const [docId, setDocId] = useState("");

  const newInfo = {
    id: docId,
    bio: inputInfo,
  };

  const updateBioInfo = {
    bio: inputInfo,
  };

  const newPostInfo = {
    captions: inputInfo,
    id: docId,
    comments: [],
    likes: [],
    timeStamp: serverTimestamp(),
  };

  const newUserData = {
    userId: user.uid,
    followers: [],
    following: [],
    bio: "",
    userName: user.displayName,
    dateMember: serverTimestamp(),
  };

  const newPostData = {
    userId: user.uid,
    userName: user.displayName,
  };
  //need to figure out how to get pic
  function addDocument(collectionName, documentData, url) {
    const userRef = collection(db, collectionName);

    addDoc(userRef, { ...documentData, picUrl: url })
      .then((res) => {
        console.log("Added document to " + collectionName);
        setDocId(res.id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function getPicUrl(e) {
    const filePic = e.target.files[0];
    const picUrl = URL.createObjectURL(filePic);
    setPicUpload(picUrl);
    const storageRef = ref(storage, filePic.name);
    //uploaded pic
    uploadBytes(storageRef, filePic).then((snapshot) => {
      console.log("Uploaded");
      getDownloadURL(storageRef).then((url) => {
        setPicUpload(url);
        if (newBio) {
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              setUser(auth.currentUser);
              addDocument("users", newUserData, url);
            })
            .catch((error) => {
              console.log(error.message);
            });
        } else if (updateBio) {
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              updateDocument("users", userInfo.id, { picUrl: url });
            })
            .catch((error) => {
              console.log(error.message);
            });
        } else {
          addDocument("post", newPostData, url);
        }
      });
    });
  }

  function updateDocument(collection, documentId, infoUpdate) {
    const collectionRef = doc(db, collection, documentId);

    updateDoc(collectionRef, infoUpdate)
      .then(() => {
        console.log("updated information");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  //Add docId to post data, along with caption about post, comments array, likes array
  function submitPost(e) {
    e.preventDefault();
    console.log("submitted");
    if (newBio) {
      updateDocument("users", docId, newInfo);
    } else if (updateBio) {
      updateDocument("users", userInfo.id, updateBioInfo);
    } else {
      updateDocument("post", docId, newPostInfo);
    }
    setPicUpload("");
    setInputInfo("");
    setDocId("");
    if (newBio) {
      setNewBio((prevState) => !prevState);
    } else if (updateBio) {
      setUpdateBio((prevState) => !prevState);
    }
  }

  function titlePage() {
    if (newBio) {
      return "Upload a Profile Pic and Bio information";
    } else if (updateBio) {
      return "Update Profile Pic and Bio";
    } else {
      return "Add a New Post";
    }
  }

  if (user) {
    return (
      <div>
        <h1>{titlePage()}</h1>
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
                value={inputInfo}
                onChange={(e) => setInputInfo(e.target.value)}
              />
            </form>
            <button className="btn-signup full-width" onClick={submitPost}>
              Submit
            </button>
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
