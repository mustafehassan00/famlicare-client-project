import React, { useRef, useState } from "react"; // Import useRef
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography, IconButton } from "@mui/material";
import axios from "axios";
import PhotoCamera from '@mui/icons-material/PhotoCamera'; // Import MUI icon for the button

function RegisterForm2() {
  const [selectedFile, setSelectedFile] = useState(null);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImageToS3 = async () => {
//todo
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
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }} // Hide the input element
        />
        <Button
          variant="contained"
          component="label" // Make the button act as a label for the hidden input
          sx={{ mt: 2 }}
          startIcon={<PhotoCamera />} // Add an icon to the button
          color="tertiary"
        >
          Upload Image
          <input
            type="file"
            hidden // Hide this input but keep it for functionality
            onChange={handleFileSelect}
            accept="image/*"
          />
        </Button>
        <Button 
          variant="contained" 
          onClick={uploadImageToS3} 
          sx={{ mt: 2 }}
          disabled={!selectedFile}
          className={!selectedFile ? "primary off": "primary"}>
          Submit Image
        </Button>
      </Box>
    </>
  );
}

export default RegisterForm2;