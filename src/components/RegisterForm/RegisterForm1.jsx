import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";

function RegisterForm1() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const Continue = (event) => {
    event.preventDefault();

    dispatch({
      type: "PHONE_NUMBER",
      payload: {
        phoneNumber: phoneNumber,
      },
    });
    history.push("/registerpage/registerpage2");
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
            Phone Number
          </Typography>
          <TextField
            label="Phone Number"
            variant="outlined"
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={(event) => setPhoneNumber(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        className={phoneNumber ? "primary" : "primary off"}
        onClick={Continue}
        sx={{ mt: 2 }}
      >
        Continue
      </Button>
    </>
  );
}

export default RegisterForm1;
