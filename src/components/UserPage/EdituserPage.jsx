import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, useTheme,Avatar,Grid } from '@mui/material';



function EdituserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);




  return (
    <Grid container alignItems="center" justifyContent="left" spacing={2} padding={4}>
    <Grid item>
      <Avatar
        sx={{ width: 100, height: 100 }}
        alt="Profile Picture"
        src="/path/to/profile-image.jpg"
      />
    </Grid>
    </Grid>
  )
}

export default EdituserPage;