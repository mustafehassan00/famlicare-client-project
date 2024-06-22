import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';

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
        password: password,
      },
    });

    history.push('/registerpage/registerpage1');
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
      <div>
        <TextField
          required
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          required
          id="emailAddress"
          label="Email"
          variant="outlined"
          value={emailAddress}
          onChange={(event) => setemailAddress(event.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button variant="contained" onClick={signUp} sx={{ mt: 3, ml: 1 }}>
        <Typography variant="h2">Sign Up</Typography>
      </Button>
    </Box>
  );
}

export default RegisterForm;