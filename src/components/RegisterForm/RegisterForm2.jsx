import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios"; // Assuming axios is used for HTTP requests

function RegisterForm2() {
  const [selectedFile, setSelectedFile] = useState(null);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImageToS3 = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // Assuming '/upload' is your API endpoint to upload files to S3
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Dispatch action with image URL or handle response
      dispatch({
        type: "IMAGE_UPLOADED",
        payload: response.data.imageUrl, // Assuming the response contains the image URL
      });

      history.push("/registerpage/registerpage3");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          width: "fit-content",
          border: "2px solid",
          borderColor: "primary.main",
          padding: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Upload Profile Picture
        </Typography>
        <input
          type="file"
          onChange={handleFileSelect}
          accept="image/*"
          style={{ marginBottom: 20 }}
        />
        <Button variant="contained" onClick={uploadImageToS3} sx={{ mt: 2 }}>
          Upload Image
        </Button>
      </Box>
    </>
  );
}

export default RegisterForm2;