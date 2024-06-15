import React from "react";
import { Container, TextField, Typography } from "@mui/material";

function LovedOneForm() {
  return;
  <>
    <Typography variant="h1">Add Your Loved One</Typography>
    <Typography variant="h2">What is their name?</Typography>
    <Container>
      <TextField label="First Name" variant="outlined" />
      <TextField label="Last Name" variant="outlined" />
    </Container>
  </>;
}

export default LovedOneForm;
