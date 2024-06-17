import axios from "axios";
import React, { useState } from "react";

function CareVault() {
  const [file, setFile] = useState();
  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5173/CareVault", formData)
      .then((res) => {})
      .catch((er) => console.log(er));
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files(0))} />
      <button type="button" onClick={upload}>
        Upload
      </button>
    </div>
  );
}

export default CareVault;
