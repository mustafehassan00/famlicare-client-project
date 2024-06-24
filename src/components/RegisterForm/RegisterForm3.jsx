import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function RegisterForm3() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const Continue = () => {
    dispatch({
      type: "FIRST_LAST_NAME",
      payload: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    history.push("/registerpage/registerpage4");
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
          "& .MuiFormControl-root": {
            mt: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Box className="MuiFormControl-root">
          <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
            First Name
          </Typography>
          <TextField
            required
            id="firstName"
            label="Enter your first name"
            variant="outlined"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </Box>
        <Box className="MuiFormControl-root">
          <Typography variant="h6" sx={{ mr: 2, minWidth: "120px" }}>
            Last Name
          </Typography>
          <TextField
            required
            id="lastName"
            label="Enter your last name"
            variant="outlined"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </Box>
        <Button variant="contained" onClick={Continue} sx={{ mt: 2 }}>
          Continue
        </Button>
      </Box>
    </>
  );
}

export default RegisterForm3;