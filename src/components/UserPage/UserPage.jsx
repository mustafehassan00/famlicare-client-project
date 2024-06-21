import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, useTheme,Avatar } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';


function UserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);

  const editUserinfo = () => {
    // route to the form where the user can edit their information

  };

  return (
    <>
    <Container sx={{ marginTop: theme.spacing(4),border: 2,
          borderColor: theme.palette.primary.light,alignItems: 'center', }}>
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

      <Avatar
          sx={{ width: 100, height: 100, marginRight: 2 }}
          alt="Profile Picture"
          src="/path/to/profile-image.jpg"
        />
    
      <Button
            variant="contained"
            className="primary on"
            onClick={editUserinfo}
          >
           
           Edit Profile
          </Button>
      
      {/* <Typography>{JSON.stringify(user, null, 2)}</Typography> */}

      {/* <Typography variant="body1">
        Your ID is: {user.id}
      </Typography> */}
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