import React, { useState } from "react";
// Importing necessary components and theme from MUI and local files
import {
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

// Functional component LovedOne_Name to capture and submit first and last name
function LovedOne_Name({ onSubmit }) {
  // State hooks for first name and last name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit({ firstName, lastName }); // Pass firstName and lastName to the onSubmit prop
  };

  return (
    <Container>
      {/* Displaying a heading */}
      <Typography variant="h2" component="h3">What is their name?</Typography>
      {/* Form for submitting names */}
      <form onSubmit={handleSubmit}>
        {/* Text field for first name */}
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} // Update firstName state on change
          fullWidth
          margin="normal"
        />
        {/* Text field for last name */}
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} // Update lastName state on change
          fullWidth
          margin="normal"
        />
        {/* Conditional rendering for the Next button */}
        {firstName && lastName ? (
          <Button variant="contained" color="primary" type="submit" align='center' sx={{mx:'auto'}}>
            Next
          </Button>
        ) : (
          <Button variant="contained" color="primary"  align='center' sx={{mx:'auto'}} disabled>
            Next
          </Button>
        )}
      </form>
    </Container>
  );
}

export default LovedOne_Name; // Exporting the component for use in other parts of the app