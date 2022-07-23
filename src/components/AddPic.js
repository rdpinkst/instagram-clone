import React, {useState} from "react";

function AddPic() {
  const [picUpload, setPicUpload] = useState("")

  function getPicUrl(e){
    const filePic = e.target.files[0];
    const picUrl = URL.createObjectURL(filePic);
    setPicUpload(picUrl);
  }

  return (
    <div>
      <input onChange={getPicUrl}type="file" />
      <div className="preview">
        <img className="selected-img" src={picUpload} alt="pic to upload"/>
      </div>
    </div>
  );
}

export default AddPic;
