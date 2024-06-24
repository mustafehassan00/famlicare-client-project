import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Typography, Button, useTheme,Avatar,Grid,TextField } from '@mui/material';


function RegisterForm3() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

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
  }; // end registerUser

  return (
    <>
      <div>
        <br></br>
          <TextField
            label="Enter First Name"
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setfirstName(event.target.value)}
          />
          <br></br>
          <br></br>
          <TextField
            label="Enter Last Name"
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setlastName(event.target.value)}
          />
      </div>
      <br></br>
      <Button onClick={Continue} variant="contained" className="primary on">Continue</Button>
    </>
  );
}

export default RegisterForm3;
