import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RegisterPage() {
  const history = useHistory();

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Page 1: Email and Password
      </Typography>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
          Back
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => {
            history.push("/registerpage/registerpage1");
          }}
        >
          Next
        </Button>
      </Box>
      <RegisterForm />
    </Box>
  );
}

export default RegisterPage;