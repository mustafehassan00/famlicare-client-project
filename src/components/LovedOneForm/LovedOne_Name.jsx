import React, { useState } from "react";
import { Button, Container, TextField, Typography, ThemeProvider } from "@mui/material";
import theme from '../Theme/FamiliCareTheme';

function LovedOne_Name({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h2">What is their name?</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit">Next</Button>
        </form>
      </Container>
    </ThemeProvider>
  );
}

export default LovedOne_Name;