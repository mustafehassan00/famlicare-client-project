import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button, useTheme,Avatar,Grid,TextField } from '@mui/material';
import { useParams } from 'react-router-dom'

//fetch the data of the user that i want to edit;
//need to know id of the user to edit 
function EdituserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);
  const params = useParams();
  const dispatch = useDispatch();
  console.log('this is the params',params);
  const id4userToedit = params.id
  console.log('user to edit', id4userToedit);
  // using this id to make a get request 

  //get data that's in the reducer editUser reducer
const editUserprofile = useSelector((store) => store.editUserprofile);
console.log('sent from reducer',editUserprofile);
// disparch user id to saga, to get user data.
useEffect (() => {
    dispatch ({
        type: "EDIT-USER-PROFILE",
        payload: id4userToedit
    })
},[])

const handleNamechange = (event) => {
    dispatch ({
        type: "CHANGE-CURRENT USERNAME",
        payload: event.target.value
    })
}
const handleEmailchange = (event) => {
    dispatch ({
        type: "CHANGE-CURRENT EMAIL",
        payload: event.target.value
    })
}
const handlePhonechange = (event) => {
    dispatch ({
        type: "CHANGE-CURRENT PHONE-NUMBER",
        payload: event.target.value
    })
}

const updateProfile = (event) => {
    event.preventDefault()
    // Sends values reducer to saga to update user profile
    dispatch ({
        type: "CHANGE-PROFILE-VALUES",
        payload: editUserprofile
    })
}
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="left"
      spacing={2}
      padding={4}
    >
      <Grid item justifyContent="Center" >
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Profile Picture"
          src="/path/to/profile-image.jpg"
         
        />
        <br></br>
        Name
        <TextField
          variant="outlined"
           value={editUserprofile.username || ''}
           onChange={handleNamechange}
          fullWidth
          margin="normal"
        />
          <br></br>
        Email
          <TextField
          variant="outlined"
           value={editUserprofile.email || ''}
           onChange={handleEmailchange}
          fullWidth
          margin="normal"
        />
        <br></br>
        Phone Number
             <TextField
          variant="outlined"
           value={editUserprofile.phone_number
             || ''}
           onChange={handlePhonechange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" className="primary on" onClick={updateProfile}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default EdituserPage;