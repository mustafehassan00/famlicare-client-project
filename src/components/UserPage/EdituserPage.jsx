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
  console.log('user to edit', id4ruserToedit);
  // using this id to make a get request 

  //get data that's in the reducer editUser reducer

useEffect (() => {
    dispatch ({
        type: "EDIT-USER-PROFILE",
        payload: id4userToedit
    })
},[])
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="left"
      spacing={2}
      padding={4}
    >
      <Grid item>
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Profile Picture"
          src="/path/to/profile-image.jpg"
        />
        <TextField
          label="First Name"
          variant="outlined"
          //  value={first_name}
          //  onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" className="primary on">
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

export default EdituserPage;