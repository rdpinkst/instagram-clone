import React, {useState, useEffect} from "react";

//pics imported to simulate without having to go to firebase
import firstPic from "../pictures/alevision-co-3jlUF7-3-4E-unsplash.jpg";
import secondPic from "../pictures/drew-dizzy-graham-cB4Uqoc9D9k-unsplash.jpg";
import thirdPic from "../pictures/harrison-fitts-VXHqJN52K6s-unsplash.jpg";
import fourthPic from "../pictures/sam-williams-UuGAw6nF0Vw-unsplash.jpg";
import fifthPic from "../pictures/simon-hermans-jTzT09l-nw4-unsplash.jpg";
import sixthPic from "../pictures/tomas-nozina-UP22zkjJGZo-unsplash.jpg";
import seventhPic from "../pictures/willian-justen-de-vasconcellos-7vKP5BAm8wg-unsplash.jpg";

const pics = [
  firstPic,
  secondPic,
  thirdPic,
  fourthPic,
  fifthPic,
  sixthPic,
  seventhPic,
];

function TilePictures({setPicUrl, picUrl, deletePic, setDeletePic}) {
  const [picArray, setPicArray] = useState(pics)

  useEffect(() => {
    if(deletePic){
      setPicArray(prevState => {
        return prevState.filter(pic => pic !== picUrl);
      })
      setPicUrl("");
      setDeletePic(false);
    }
  }, [deletePic, picUrl, setPicUrl, setDeletePic])
  
  const postedPics = picArray.map((pic, index) => {
    return (
      <div key={index} className="individual-pic" onClick={() => setPicUrl(pic)}>
        <img src={pic} alt="posted pic" className="trying-it"></img>
      </div>
    );
  });

  return <div className="pic-tile">{postedPics}</div>;
}

export default TilePictures;
