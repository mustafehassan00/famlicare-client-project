import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  useTheme,
  Avatar,
  Grid,
  TextField,
  Paper,
} from "@mui/material";
import { useHistory } from "react-router-dom";

function UserPage() {
  const theme = useTheme();
  // useSelector hook to access the current user state from the Redux store
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const editUserinfo = () => {
    // Redirects to the user update page, ensure the route is correctly defined in your router setup
    history.push(`/update-user/${user.id}`);
  };

  const profileFields = [
    { label: "Username", value: user.username },
    { label: "Email", value: user.email },
    { label: "Name", value: user.first_name + " " + user.last_name },
    { label: "Phone Number", value: user.phone_number },
    { label: "User ID", value: user.id },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3, bgcolor: 'primary.light', color: theme.palette.common.white}}>
      <Paper elevation={3} sx={{ p: 3}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Profile Picture"
              src="/path/to/profile-image.jpg"
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              User Profile
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" className="primary" onClick={editUserinfo}>
              Edit Profile
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {profileFields.map((field) => (
            <React.Fragment key={field.label}>
              <Grid item xs={12} sm={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {field.label}:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1">
                  {field.value || "Not set"}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserPage;
