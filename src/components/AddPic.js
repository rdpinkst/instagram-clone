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

  function getPicUrl(e) {
    const filePic = e.target.files[0];
    const picUrl = URL.createObjectURL(filePic);
    setPicUpload(picUrl);
    const storageRef = ref(storage, filePic.name);
    //uploaded pic
    uploadBytes(storageRef, filePic).then((snapshot) => {
      console.log("Uploaded");
      getDownloadURL(storageRef).then((url) => {
        if (newBio) {
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              setUser(auth.currentUser);
              const userRef = collection(db, "users");

              addDoc(userRef, {
                userId: user.uid,
                profilePic: url,
                followers: [],
                following: [],
                bio: "",
                userName: user.displayName,
                dateMember: serverTimestamp(),
              })
                .then((res) => {
                  console.log("User collection started");
                  setDocId(res.id);
                })
                .catch((error) => {
                  console.log(error.message);
                });
            })
            .catch((error) => {
              console.log(error.message);
            });
        } else {
          const postRef = collection(db, "post");

          addDoc(postRef, {
            userId: user.uid,
            picUrl: url,
            userName: user.displayName,
          })
            .then((res) => {
              setDocId(res.id);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      });
    });
  }

  //Add docId to post data, along with caption about post, comments array, likes array
  function submitPost(e) {
    e.preventDefault();
    console.log("submitted");
    if (newBio) {
      const userRef = doc(db, "users", docId);

      updateDoc(userRef, {
        id: docId,
        bio: inputInfo,
      })
        .then(() => {
          setPicUpload("");
          setInputInfo("");
          setDocId("");
          setNewBio((prevState) => !prevState);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (updateBio) {
      const userRef = doc(db, "users", userInfo.id);

      updateDoc(userRef, {
        bio: inputInfo,
      })
        .then(() => {
          setPicUpload("");
          setInputInfo("");
          setUpdateBio((prevState) => !prevState);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      const newPostRef = doc(db, "post", docId);

      updateDoc(newPostRef, {
        captions: inputInfo,
        id: docId,
        comments: [],
        likes: [],
        timeStamp: serverTimestamp(),
      })
        .then(() => {
          console.log("Updated");
          alert("Picture Info Added");
          setPicUpload("");
          setInputInfo("");
          setDocId("");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  function titlePage(){
    if(newBio){
      return "Upload a Profile Pic and Bio information";
    } else if(updateBio){
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
