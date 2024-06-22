import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddress, setemailAddress] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const signUp = () => {
    dispatch({
      type: "USERNAME_EMAIL_PASSWORD",
      payload: {
        username: username,
        emailAddress: emailAddress,
        password: password,
      },
    });

    history.push("/registerpage/registerpage1");
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the start of the flex container
        "& .MuiFormControl-root": {
          // Target the form control root for spacing
          mt: 2, // Margin top for spacing between form controls
          display: "flex", // Display as flex to align label and input side by side
          flexDirection: "row", // Arrange label and input in a row
          alignItems: "center", // Vertically center align the label and input
          width: "100%", // Set width to 100% to fill the container
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Box className="MuiFormControl-root">
        <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
          Username
        </Typography>
        <TextField
          required
          id="username"
          label="Enter your username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          sx={{ flexGrow: 1 }} // Allow the text field to grow to fill available space
        />
      </Box>
      <Box className="MuiFormControl-root">
        <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
          Email Address
        </Typography>
        <TextField
          required
          id="emailAddress"
          label="Enter your email"
          variant="outlined"
          value={emailAddress}
          onChange={(event) => setemailAddress(event.target.value)}
          sx={{ flexGrow: 1 }}
        />
      </Box>
      <Box className="MuiFormControl-root">
        <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
          Password
        </Typography>
        <TextField
          required
          id="password"
          label="Enter your password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ flexGrow: 1 }}
        />
      </Box>
    </Box>
  );
}

export default RegisterForm;
