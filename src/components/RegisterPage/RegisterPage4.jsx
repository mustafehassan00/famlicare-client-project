import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RegisterPage4() {
  const errors = useSelector((store) => store.errors);
  const registerReducer = useSelector((store) => store.registerReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: "REGISTER",
      payload: {
        registerReducer
      },
    });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Page 4: Review and Submit
      </Typography>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
          Back
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={registerUser}
        >
          Register
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 2, mt: 2, display: 'inline-block' }}>
        {errors.registrationMessage && (
          <Typography color="error" gutterBottom>
            {errors.registrationMessage}
          </Typography>
        )}
        <Typography>{`First Name: ${registerReducer.firstName}`}</Typography>
        <Typography>{`Last Name: ${registerReducer.lastName}`}</Typography>
        <Typography>{`Username: ${registerReducer.username}`}</Typography>
        <Typography>{`Email Address: ${registerReducer.emailAddress}`}</Typography>
        <Typography>{`Phone Number: ${registerReducer.phoneNumber}`}</Typography>
      </Paper>
    </Box>
  );
}

export default RegisterPage4;