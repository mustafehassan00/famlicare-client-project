import React, { useState } from "react";
// Importing necessary components and theme from MUI and local files
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

// Functional component LovedOne_Name to capture and submit first and last name
// This component is designed to be reusable and easily integrated into larger forms or applications.
function LovedOne_Name({ onSubmit }) {
  // State hooks for first name and last name
  // These states are local to this component and are used to capture user input.
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const theme = useTheme(); // Using MUI theme for consistent styling across the app.

  // Handle form submission
  // Prevents the default form submission behavior and calls the onSubmit prop with the first and last name.
  // The console.log is for debugging purposes and should be removed in production.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ first_name, last_name });
    console.log(first_name, last_name); // Consider removing for production or replacing with a more sophisticated logging mechanism.
  };

  return (
    <Container>
      {/* Displaying a heading */}
      {/* Typography component from MUI is used for consistent text styling. */}
      <Typography variant="h2" component="h3">
        What is their name?
      </Typography>
      {/* Form for submitting names */}
      {/* The form uses an onSubmit handler to process the data. */}
      <form onSubmit={handleSubmit}>
        {/* Text field for first name */}
        {/* The TextField component is controlled, with its value tied to the component's state. */}
        <TextField
          label="First Name"
          variant="outlined"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)} // Update firstName state on change. Ensure this handler is efficient for a smooth user experience.
          fullWidth
          margin="normal"
        />
        {/* Text field for last name */}
        {/* Similar to the first name field, this is a controlled component. */}
        <TextField
          label="Last Name"
          variant="outlined"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)} // Update lastName state on change. Validate input if necessary.
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="center" mt={2}>
          {/* Conditionally render the button */}
          {/* The button is only enabled when both first and last names are provided. This is a simple form of validation. */}
          {first_name && last_name ? (
            <Button variant="contained" className="primary on" type="submit">
              Next
            </Button>
          ) : (
            <Button variant="contained" className="primary off" disabled>
              Next
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
}

export default LovedOne_Name;
