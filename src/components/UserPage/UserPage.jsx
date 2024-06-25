import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  useTheme,
  Avatar,
  Grid,
  TextField
} from "@mui/material";
import { useHistory } from "react-router-dom";

function UserPage() {
  const theme = useTheme();
  // useSelector hook to access the current user state from the Redux store
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  // // useEffect hook to fetch user data on component mount
  // useEffect(() => {
  //   dispatch({ type: "FETCH_USER" });
  //   // Ensure the 'FETCH_USER' action is defined in your Redux setup to fetch user data
  // }, []);

  const editUserinfo = () => {
    // Redirects to the user update page, ensure the route is correctly defined in your router setup
    history.push(`/update-user/${user.id}`);
  };

  return (
    <>
      <Container
        sx={{
          marginTop: theme.spacing(4),
          border: "2px solid",
          borderColor: theme.palette.primary.light,
          padding: theme.spacing(2),
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Grid container alignItems="center" justifyContent="left" spacing={2}>
          <Grid item>
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Profile Picture"
              src="/path/to/profile-image.jpg" // Ensure the path is correct for profile images. Incorrect paths will result in broken image links.
            />
          </Grid>
          <Grid item>
            <Typography variant="h2" sx={{ marginBottom: theme.spacing(1) }}>
              {user.username} {/* Display the username, ensure username is always fetched and updated in the global state */}
              <br />
              {user.id} {/* Display the user ID, useful for debugging and verification */}
            </Typography>
            <Typography variant="h3" sx={{ marginBottom: theme.spacing(1) }}>
              {user.email} {/* Display the user email, ensure email is correctly fetched and updated */}
            </Typography>
            <Button
              variant="contained"
              className="primary on"
              onClick={editUserinfo}
            >
              Edit Profile {/* Button to trigger user info edit, ensure onClick handler is correctly implemented */}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <TextField
        variant="outlined"
        placeholder="Privacy Policy {coming soon}"
        disabled // Placeholder for future features, ensure to implement or remove before production
        fullWidth
        margin="normal"
      />
      <TextField
        variant="outlined"
        placeholder="Change Password {coming soon}"
        disabled // Placeholder for future features, ensure to implement or remove before production
        fullWidth
        margin="normal"
      />
    </>
  );
}

export default UserPage;