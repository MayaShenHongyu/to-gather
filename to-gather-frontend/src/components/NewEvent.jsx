import React, { useState } from "react";
import { upLoadImage, createEvent } from "../backend";
export default function NewEvent() {
  const [img, setImg] = useState();
  return (
    <div>
      <input type="file" onChange={(event) => setImg(event.target.files[0])} />
      <button
        onClick={() => {
          upLoadImage("someimg", img);
        }}
      >
        Upload image
      </button>
    </div>
  );
}
