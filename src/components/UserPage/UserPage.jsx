import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, useTheme,Grid } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';


function UserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);

  return (
    <>
    <Container sx={{ marginTop: theme.spacing(4),border: 2,
          borderColor: theme.palette.primary.main }}>
      <Typography 
        variant="h2" 
        sx={{ marginBottom: theme.spacing(2) }}
      >
       {user.username}
      </Typography>
      <Typography 
        variant="h3" 
        sx={{ marginBottom: theme.spacing(2) }}
      >
       {user.email}
      </Typography>
      
      <Typography>{JSON.stringify(user, null, 2)}</Typography>

      <Typography variant="body1">
        Your ID is: {user.id}
      </Typography>

      

      {/* Assuming LogOutButton can accept MUI Button props */}
      {/* <LogOutButton 
        className="primary on" 
        component={Button} 
        sx={{ marginTop: theme.spacing(2) }}
      /> */}
      
    </Container>


   
</>
  );
}

export default UserPage;