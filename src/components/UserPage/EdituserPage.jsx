import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button, Avatar, Grid, TextField } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';

function EdituserPage() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const params = useParams();
  const dispatch = useDispatch();
  const id4userToedit = params.id;
  const editUserprofile = useSelector((store) => store.editUserprofile);

  useEffect(() => {
    dispatch({
      type: "EDIT-USER-PROFILE",
      payload: id4userToedit
    });
  }, [dispatch, id4userToedit]);

  const handleNamechange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT USERNAME",
      payload: event.target.value
    });
  };

  const handleEmailchange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT EMAIL",
      payload: event.target.value
    });
  };

  const handlePhonechange = (event) => {
    dispatch({
      type: "CHANGE-CURRENT PHONE-NUMBER",
      payload: event.target.value
    });
  };

  const updateProfile = (event) => {
    event.preventDefault();
    dispatch({
      type: "CHANGE-PROFILE-VALUES",
      payload: editUserprofile
    });
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ p: 4 }}
    >
      <Button variant="outlined" color="primary" startIcon={<ArrowBack/>} onClick={() => history.goBack()}>Back</Button>

      <Grid item justifyContent="center">
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Profile Picture"
          src="/path/to/profile-image.jpg"
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
        </Button>
      </Grid>
    </Grid>
  );
}

export default EdituserPage;