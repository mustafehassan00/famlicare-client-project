import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function RegisterForm2() {
  const [selectedFile, setSelectedFile] = useState(null); // State to hold selected file
  const history = useHistory();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Capture the selected file and save it to selectedFile variable
  };

  const continueRegistration = async () => {
    // //if a file is not selected alert to select a file.
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    try {
    
      // Dispatch action or handle state update if needed
      history.push("/registerpage/registerpage3");
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
