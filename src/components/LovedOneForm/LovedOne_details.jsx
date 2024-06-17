import React, { useState } from "react";
// Importing necessary components from MUI
import { Box, Button, Container, TextField, Typography, useTheme } from "@mui/material";

// Functional component LovedOne_Details to capture and submit age and medical condition
function LovedOne_Details({ onSubmit, onPrevStep }) {
  // State hooks for age and medical condition
  const [age, setAge] = useState("");
  const [main_condition, setMainCondition] = useState("");
  const theme = useTheme();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit({ age, main_condition }); // Pass age and medical_condition to the onSubmit prop
    console.log(age, main_condition)
  };

  return (
    <Container>
      {/* Displaying a heading */}
      <Typography variant="h2" component="h3">
        What is their age?
      </Typography>
      {/* Form for submitting age and medical condition */}
      <form onSubmit={handleSubmit}>
        {/* Text field for age */}
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)} // Update age state on change
          fullWidth
          margin="normal"
        />
        {/* Text field for main conditions */}
        <Typography variant="h2" component="h3">
          What are their medical conditions?
        </Typography>
        <TextField
          label="Main Conditions"
          variant="outlined"
          value={main_condition}
          onChange={(e) => setMainCondition(e.target.value)} // Update main_condition state on change
          fullWidth
          margin="normal"
          multiline // enables multiline input
          rows={4} //sets minimum visible rows
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: theme.spacing(2),
          }}
        >
        <Button variant="text" onClick={onPrevStep}>Previous Step</Button>
          {/* Conditional rendering for the Next button */}
          {age && main_condition ? (
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

export default LovedOne_Details; // Exporting the component for use in other parts of the app
