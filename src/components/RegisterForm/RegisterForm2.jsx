import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function RegisterForm2() {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold selected file
  const history = useHistory();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Capture the selected file
  };

  const continueRegistration = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile); // Append the file to FormData

      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      const response = await axios.post("/api/user", formData, config);
      console.log("File uploaded successfully:", response.data);
      // Dispatch action or handle state update if needed
      history.push("/registerpage/registerpage3");
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error if needed
    }
  };

  return (
    <>
      <div>
        <h2>Registered User Profile picture</h2>
        <div>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <button onClick={continueRegistration}>Continue</button>
    </>
  );
}

export default RegisterForm2;
