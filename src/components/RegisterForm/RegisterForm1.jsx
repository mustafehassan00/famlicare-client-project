import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

function RegisterForm1() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

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
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Phone Number"
        variant="outlined"
        type="tel"
        name="phoneNumber"
        value={phoneNumber}
        required
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <Button variant="contained" onClick={Continue}>Continue</Button>
    </Box>
  );
}

export default RegisterForm1;