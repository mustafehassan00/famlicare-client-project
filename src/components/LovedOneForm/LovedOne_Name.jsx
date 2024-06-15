import React from "react";
import { Container, TextField, Typography, Button, ThemeProvider } from "@mui/material";
import theme from '../Theme/FamiliCareTheme';

function LovedOne_Name() {
    const dspatchCreateLovedOne = ()=>{
        //todo
        console.log("dispatching create loved one action");
        };
  return
  <>
    <ThemeProvider theme={theme}>
      <Typography variant="h2">What is their name?</Typography>
      <Container>
        <TextField label="First Name" variant="outlined" />
        <TextField label="Last Name" variant="outlined" />
      </Container>
      <Button className="primary off" onClick=dispatchCreateLovedOne>Continue</Button>
    </ThemeProvider>
  </>;
}

export default LovedOne_Name;
