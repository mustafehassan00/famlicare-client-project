import React from 'react';
import { Container, Grid, Button, Typography, useTheme } from '@mui/material';

function Homepage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ marginTop: theme.spacing(4) }}>
      <Typography 
        variant="h4" 
        sx={{ marginBottom: theme.spacing(3), color: theme.palette.primary.main }}
      >
        Welcome to FamliCare
      </Typography>
      
      <Grid container spacing={3}>
        {/* Navigation buttons */}
        <Grid item xs={6} sm={3}>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
          >
            User Profile
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
          >
            Messages
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
          >
            CareTeam
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
          >
            CareVault
          </Button>
        </Grid>
        
        {/* Placeholder for CareCalendar (stretch goal) */}
        <Grid item xs={12}>
          <Button 
            variant="outlined" 
            fullWidth 
            disabled 
            sx={{ borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main }}
          >
            CareCalendar (Coming Soon)
          </Button>
        </Grid>
        
        {/* Placeholders for CareFeed and CareMap (not included) */}
        <Grid item xs={6}>
          <Button 
            variant="outlined" 
            fullWidth 
            disabled 
            sx={{ borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main }}
          >
            CareFeed (Not Available)
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="outlined" 
            fullWidth 
            disabled 
            sx={{ borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main }}
          >
            CareMap (Not Available)
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
