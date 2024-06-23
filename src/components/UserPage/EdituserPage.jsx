import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, useTheme,Avatar,Grid,TextField } from '@mui/material';


//fetch the data of the user that i want to edit;
//need to know id of the user to edit 
function EdituserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);




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
          <Button variant="contained" className="primary on" >
              Save
            </Button>
      </Grid>
    </Grid>
  );
}

export default EdituserPage;