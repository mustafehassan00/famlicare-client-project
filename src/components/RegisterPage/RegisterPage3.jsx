import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm3 from "../RegisterForm/RegisterForm3";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RegisterPage3() {
  const history = useHistory();

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Step 4: Additional Information
      </Typography>
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
          Back
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => {
            history.push("/registerpage/registerpage4");
          }}
        >
          Next
        </Button>
      </Box>
      <RegisterForm3 />
    </Box>
  );
}

export default RegisterPage3;