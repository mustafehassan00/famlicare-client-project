import React from 'react';
import { Container, Grid, Button, Typography, useTheme } from '@mui/material';

function Homepage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ marginTop: theme.spacing(4) }}>
      <Typography variant="h4" sx={{ marginBottom: theme.spacing(3) }}>
        Welcome to FamliCare
      </Typography>
      
      <Grid container spacing={3}>
        {/* Navigation buttons */}
        <Grid item xs={6} sm={3}>
          <Button variant="contained" fullWidth>User Profile</Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="contained" fullWidth>Messages</Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="contained" fullWidth>CareTeam</Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="contained" fullWidth>CareVault</Button>
        </Grid>
        
        {/* Placeholder for CareCalendar (stretch goal) */}
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth disabled>CareCalendar (Coming Soon)</Button>
        </Grid>
        
        {/* Placeholders for CareFeed and CareMap (not included) */}
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth disabled>CareFeed (Not Available)</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth disabled>CareMap (Not Available)</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;