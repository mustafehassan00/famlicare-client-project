import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm1 from "../RegisterForm/RegisterForm1";
import { Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RegisterPage1() {
  const history = useHistory();

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Step 2: Phone Number in case we need to contact you
      </Typography>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
          Back
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => {
            history.push("/registerpage/registerpage2");
          }}
        >
          Next
        </Button>
      </Box>
      <Box mt={2}>
        <RegisterForm1 />
      </Box>
    </Box>
  );
}

export default RegisterPage1;