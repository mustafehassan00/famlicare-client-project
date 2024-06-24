import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Typography, Button, useTheme,Avatar,Grid,TextField } from '@mui/material';


function RegisterForm1() {
  const [phoneNumber, setphoneNumber] = useState("");

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
  }; // end registerUser

  return (
    <>
      <div>
        <label htmlFor="Phone Number">
          <TextField
            type="phoneNumber"
            label="Enter Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={(event) => setphoneNumber(event.target.value)}
          />
        </label>
      </div>
      <br></br>
      <Button onClick={Continue} variant="contained" className="primary on">Continue</Button>
    </>
  );
}

export default RegisterForm1;
