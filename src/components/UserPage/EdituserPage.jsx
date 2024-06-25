// Import necessary libraries and components
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button, Avatar, Grid, TextField } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';

function EdituserPage() {
  // Hooks for navigation and accessing Redux store
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  // Extract user ID from URL parameters
  const id4userToedit = params.id;

  // Access user data from Redux store
  const user = useSelector((store) => store.user);
  const editUserprofile = useSelector((store) => store.editUserprofile);

  // Fetch user data for editing on component mount
  useEffect(() => {
    dispatch({
      type: "EDIT-USER-PROFILE",
      payload: id4userToedit
    });
    // Ensure the EDIT-USER-PROFILE action is correctly handled in your reducer
    // This action should fetch and populate the form with the user's current information
  }, [dispatch, id4userToedit]);

  // Handlers for form field changes, dispatch actions to update local state
  const handleNamechange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT USERNAME",
      payload: event.target.value
    });
    // Ensure the CHANGE-CURRENT USERNAME action updates the username in the local state
  };

  const handleEmailchange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT EMAIL",
      payload: event.target.value
    });
    // Ensure the CHANGE-CURRENT EMAIL action updates the email in the local state
  };

  const handlePhonechange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT PHONE-NUMBER",
      payload: event.target.value
    });
    // Ensure the CHANGE-CURRENT PHONE-NUMBER action updates the phone number in the local state
  };

  const updateProfile = (event) => {
    event.preventDefault();
    dispatch({
      type: "CHANGE-PROFILE-VALUES",
      payload: editUserprofile
    });
    // Ensure the CHANGE-PROFILE-VALUES action correctly updates the user's profile in the database
    // Navigate back to UserPage with a state flag indicating a successful edit
    history.push('/user', { fromEdit: true });
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ p: 4 }}
    >
      <Button variant="outlined" color="primary" startIcon={<ArrowBack/>} onClick={() => history.goBack()}>
      {/** Back button to previous page */}
        Back 
      </Button>

      <Grid item justifyContent="center">
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Profile Picture"
          src="/path/to/profile-image.jpg" // Ensure the path to the profile image is correct
        />
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          Name
        </Typography>
        <TextField
          variant="outlined"
          value={editUserprofile.username || ''}
          onChange={handleNamechange}
          fullWidth
          margin="normal"
        />
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          Email
        </Typography>
        <TextField
          variant="outlined"
          value={editUserprofile.email || ''}
          onChange={handleEmailchange}
          fullWidth
          margin="normal"
        />
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          Phone Number
        </Typography>
        <TextField
          variant="outlined"
          value={editUserprofile.phone_number || ''}
          onChange={handlePhonechange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={updateProfile}>
          Save 
          {/** Button to save changes and update the user's profile */}
        </Button>
      </Grid>
    </Grid>
  );
}

export default EdituserPage;