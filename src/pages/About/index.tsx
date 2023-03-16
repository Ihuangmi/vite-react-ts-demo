import React, { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
let ImageData = fetchData("https://dog.ceo/api/breeds/image/random");
const ImageShow: React.FC = () => {
  const [imgsrc, setImgsrc] = useState("");
  const imageInfo = ImageData.read();
  console.log(imageInfo);

  console.log("xxxxxxxxxxx");

  useEffect(() => {
    console.log("useEffect");
  });

  return (
    <div>
      <img src={imageInfo.message} />
    </div>
  );
};

export default ImageShow;
