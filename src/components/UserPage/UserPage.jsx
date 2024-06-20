import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, useTheme } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';

function UserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);

  return (
    <Container sx={{ marginTop: theme.spacing(4) }}>
      <Typography 
        variant="h2" 
        sx={{ marginBottom: theme.spacing(2) }}
      >
        Welcome, {user.username}!
      </Typography>
      <Typography variant="body1">
        Your ID is: {user.id}
      </Typography>
      {/* Assuming LogOutButton can accept MUI Button props */}
      <LogOutButton 
        className="btn" 
        component={Button} 
        sx={{ marginTop: theme.spacing(2) }}
      />
    </Container>
  );
}

export default UserPage;