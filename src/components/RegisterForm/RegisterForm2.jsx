import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormData from "form-data"; // Import FormData from axios-form-data


function RegisterForm2() {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold selected file
  const history = useHistory();
  const dispatch = useDispatch();


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Capture the selected file and save it to selectedFile variable
  };

  const continueRegistration = async () => {
    //if a file is not selected alert to select a file.
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

// Append the file to FormData ie add selected photo to formData variable
    const formData = new FormData();
    formData.append("photo", selectedFile); 

// dispatch the photo upload to store selected file in Redux state
dispatch({
  type: "IMAGE_SELECTED",
  payload: {
    selectedFile: formData
  },
});
      // Dispatch action or handle state update if needed
      history.push("/registerpage/registerpage3");
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
