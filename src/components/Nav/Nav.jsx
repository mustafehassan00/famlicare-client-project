import React from "react";
import { NavLink } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
// import "./Nav.css"; // Uncomment for custom styles. Ensure the path is correct.
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Button, useTheme } from "@mui/material";
import famliCareLogo from "./PRIMARY_Horiz.png";

function Nav() {
  // Accessing the current user state from the Redux store.
  const user = useSelector((store) => store.user);
  // Using the theme for consistent styling across the app.
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      color="primary"
      // Margin bottom is used to avoid overlap with the page content.
      sx={{ marginBottom: theme.spacing(2) }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <NavLink
            to="/home"
            // Styling for the NavLink to make it fit the theme.
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
          >
            <img
              src={famliCareLogo}
              alt="FamliCare Logo"
              // Adjust the logo size and background. Modify maxHeight for larger/smaller logo.
              style={{
                maxHeight: "100px",
                backgroundColor: "white",
                borderRadius: 18,
              }}
            />
          </NavLink>
        </Box>
        <Box>
          {!user.id && (
            // Show login/register button if user is not logged in.
            <Button
              color="secondary"
              component={NavLink}
              to="/login"
              sx={{ typography: "h2", margin: theme.spacing(1) }}
            >
              Login / Register
            </Button>
          )}
          {user.id && (
            // Show navigation buttons if user is logged in.
            <>
              <Button
                color="inherit"
                component={NavLink}
                to="/home"
                sx={{ typography: "h2", margin: theme.spacing(1) }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to="/user"
                sx={{ typography: "h2", margin: theme.spacing(1) }}
              >
                User Profile
              </Button>
              <Button color="inherit" component={NavLink} to="/chat" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                Messages
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to="/carevault"
                sx={{ typography: "h2", margin: theme.spacing(1) }}
              >
                CareVault
              </Button>
              <Button color = "inherit" component={NavLink} to="/createorjointeam" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
              Create or Join a Team
              </Button>
              <Button color="inherit" component={NavLink} to="/lovedoneform" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                LovedOne Form
              </Button>
              <Button color="inherit" component={NavLink} to="/careteamform" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                CareTeam
              </Button>
              <LogOutButton
                sx={{
                  typography: "h2",
                  margin: theme.spacing(1),
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.secondary.main
                  ),
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              />
              {/* LogOutButton component handles user logout. Ensure it's correctly implemented in its file. */}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
// Note: Ensure all routes in NavLink components are correctly defined in your router setup.
// If any issues arise with navigation, check for typos in the path and ensure the corresponding route components are properly imported and rendered.
