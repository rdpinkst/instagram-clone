import React, {useState} from "react";
import {Navigate} from "react-router-dom"

function AddPic({user}) {
  const [picUpload, setPicUpload] = useState("")

  function getPicUrl(e){
    const filePic = e.target.files[0];
    const picUrl = URL.createObjectURL(filePic);
    setPicUpload(picUrl);
  }

  if(user){
  return (
    <div>
      <input onChange={getPicUrl}type="file" />
      {picUpload && <div className="preview">
        <img className="selected-img" src={picUpload} alt="pic to upload"/>
        <form className="form-picdesc">
          <label for="description" className="desc-bold">Description: </label>
          <textarea id="description" type="text" /> 
        </form>
        <button className="btn-signup full-width">Submit</button>
      </div>}
    </div>
  );
  }

  if(!user){
    return <Navigate to="/" replace={true} />;
  }
}

export default AddPic;
