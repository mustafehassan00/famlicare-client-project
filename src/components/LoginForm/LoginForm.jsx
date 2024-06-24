import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, Button } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
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
        onSubmit={login}
      >
        <Typography variant="h6">Login</Typography>
        {errors.loginMessage && (
          <Typography className="alert" role="alert" color="error">
            {errors.loginMessage}
          </Typography>
        )}
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
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
    </>
  );
}

export default LoginForm;