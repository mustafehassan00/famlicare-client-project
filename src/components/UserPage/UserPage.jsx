import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  useTheme,
  Avatar,
  Grid,
  TextField,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";

// Custom hook to track previous location
// Useful for actions that depend on navigation history, such as refetching data after navigation
function usePreviousLocation() {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState();

  useEffect(() => {
    // Update previous location whenever the current location changes
    setPrevLocation(location);
  }, [location]);

  return prevLocation;
}

function UserPage() {
  const theme = useTheme();
  const user = useSelector((store) => store.user); // Accessing user data from Redux store
  const history = useHistory();
  const dispatch = useDispatch();
  const prevLocation = usePreviousLocation();

  const editUserinfo = () => {
    // Route to the form where the user can edit their information
    // Ensure the route matches your routing setup
    history.push(`/update-user/${user.id}`);
    console.log("Edit the user with the id of", user.id); // Debugging: Log user ID on edit attempt
  };

  useEffect(() => {
    // Fetch user data on component mount
    // Make sure the action type "FETCH_USER" is handled in your Redux saga or reducer
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  // Refetch user data when navigating back to the UserPage after an update
  // This relies on changes in the history object to trigger a refetch
  useEffect(() => {
    // Check if the user navigated from `/update-user/${user.id}` to `/user`
    // Adjust the paths as necessary if routing structure changes
    if (
      prevLocation?.pathname === `/update-user/${user.id}` &&
      location.pathname === "/user"
    ) {
      dispatch({ type: "FETCH_USER" }); // Refetch user data
    }
  }, [dispatch, location, prevLocation, user.id]);

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
              src="/path/to/profile-image.jpg" // Ensure the path is correct for profile images
            />
          </Grid>
          <Grid item>
            <Typography variant="h2" sx={{ marginBottom: theme.spacing(1) }}>
              {user.username} {/* Display the username */}
              <br></br>
              {user.id} {/* Display the user ID */}
            </Typography>
            <Typography variant="h3" sx={{ marginBottom: theme.spacing(1) }}>
              {user.email} {/* Display the user email */}
            </Typography>
            <Button
              variant="contained"
              className="primary on"
              onClick={editUserinfo}
            >
              Edit Profile {/* Button to trigger user info edit */}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <TextField
        variant="outlined"
        placeholder="Privacy Policy {coming soon}"
        disabled // Placeholder for future features
        fullWidth
        margin="normal"
      />
      <TextField
        variant="outlined"
        placeholder="Change Password {coming soon}"
        disabled // Placeholder for future features
        fullWidth
        margin="normal"
      />
      </>
  );
}

export default UserPage;