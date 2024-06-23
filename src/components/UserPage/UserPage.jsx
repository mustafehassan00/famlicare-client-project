import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, useTheme,Avatar,Grid } from '@mui/material';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useHistory } from "react-router-dom";


function UserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const editUserinfo = () => {
    // route to the form where the user can edit their information
    history.push("/profileEdit");
    console.log('Edit the user with the id of',user.id)

  };

  return (
    <>
      <Container
        sx={{
          marginTop: theme.spacing(4),
          border: "2px solid",
          borderColor: theme.palette.primary.light,
          padding: theme.spacing(2),
        }}
      >
        <Grid container alignItems="center" justifyContent="left" spacing={2}>
          <Grid item>
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Profile Picture"
              src="/path/to/profile-image.jpg"
            />
          </Grid>
          <Grid item>
            <Typography variant="h2" sx={{ marginBottom: theme.spacing(1) }}>
              {user.username}
              <br></br>
              {user.id}

            </Typography>
            <Typography variant="h3" sx={{ marginBottom: theme.spacing(1) }}>
              {user.email}
            </Typography>
            <Button
              variant="contained"
              className="primary on"
              onClick={editUserinfo}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Container>

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
    </>
  );
}

export default UserPage;