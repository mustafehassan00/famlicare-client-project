import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Button, useTheme,Avatar,Grid,TextField } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddress, setemailAddress] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const signUp = () => {
   
    dispatch({
      type: 'USERNAME_EMAIL_PASSWORD',
      payload: {
        username: username,
        emailAddress: emailAddress,
        password: password
      },
    });

    history.push('/registerpage/registerpage1');


  }; // submit phone number

  return (
    <>
        <Grid  justifyContent="center">
        <Grid item xs={12} align="center">
        <TextField
          label="Enter User Name"
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
         </Grid>
        <br></br>
        <Grid item xs={12} align="center">
         <TextField
           label="Enter Email Address"
            type="text"
            name="emailAddress"
            value={emailAddress}
            required
            onChange={(event) => setemailAddress(event.target.value)}
          />
           </Grid>
      <br></br>
      <Grid item xs={12} align="center">
          <TextField
            label="Enter Password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
           </Grid>
      <Button onClick={signUp} variant="contained" className="primary on">Sign Up</Button>
      </Grid>
    </>
  );
}

export default RegisterForm;
