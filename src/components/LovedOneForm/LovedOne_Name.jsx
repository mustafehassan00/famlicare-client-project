import React, { useState } from "react";
import {useDispatch} from 'react-redux'
// Importing necessary components and theme from MUI and local files
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import {STORE_LOVED_ONE_NAME_INFO_REQUEST} from '../../redux/reducers/actions'

// Functional component LovedOne_Name to capture and submit first and last name
function LovedOne_Name({ onSubmit }) {
  // State hooks for first name and last name
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the STORE_LOVED_ONE_NAME_INFO_REQUEST action with first_name and last_name as payload
    dispatch(STORE_LOVED_ONE_NAME_INFO_REQUEST({ first_name, last_name }));
    console.log(first_name, last_name);
  };

  return (
    <Container>
      {/* Displaying a heading */}
      <Typography variant="h2" component="h3">
        What is their name?
      </Typography>
      {/* Form for submitting names */}
      <form onSubmit={handleSubmit}>
        {/* Text field for first name */}
        <TextField
          label="First Name"
          variant="outlined"
          value={first_name}c
          onChange={(e) => setFirstName(e.target.value)} // Update firstName state on change
          fullWidth
          margin="normal"
        />
        {/* Text field for last name */}
        <TextField
          label="Last Name"
          variant="outlined"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)} // Update lastName state on change
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="center" mt={2}>
          {/**Conditionally render the button */}
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
import { STORE_LOVED_ONE_NAME_INFO_REQUEST } from "../../redux/reducers/actions/lovedOne.actions";

export default LovedOne_Name; // Exporting the component for use in other parts of the app
