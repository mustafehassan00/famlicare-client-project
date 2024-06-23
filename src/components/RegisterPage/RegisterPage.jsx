import React from "react";
import { Container, Typography, Button, useTheme,Avatar,Grid,TextField } from '@mui/material';


import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
<Grid  container
      direction="column"
      alignItems="center"
      justifyContent="center"
      // style={{ minHeight: "100vh" }}
      >
      <Typography variant="h2"> Sign Up</Typography>
      <Button onClick={() => history.goBack()}> ⬅️ </Button>
      <button
        onClick={() => {
          history.push("/registerpage/registerpage1");
        }}
      >
        {" "}
        ➡️ {" "}
      </button>
     
      
      <RegisterForm />
      </Grid>
    </div>
  );
}

export default RegisterPage;
