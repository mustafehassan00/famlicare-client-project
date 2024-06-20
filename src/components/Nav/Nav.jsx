import React from "react";
import { NavLink } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
// import "./Nav.css";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Button, useTheme } from "@mui/material";

function Nav() {
  const user = useSelector((store) => store.user);
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      color="default"
      sx={{ marginBottom: theme.spacing(2) }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <NavLink
            to="/home"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
          >
            <img
              src="./PRIMARY_Horiz.png"
              alt="FamliCare Logo"
              style={{ maxHeight: "50px" }}
            />
          </NavLink>
        </Box>
        <Box>
          {!user.id && (
            <Button color="inherit" component={NavLink} to="/login">
              Login / Register
            </Button>
          )}
          {user.id && (
            <>
              <Button color="inherit" component={NavLink} to="/user">
                Home
              </Button>
              <Button color="inherit" component={NavLink} to="/messages">
                💬 Messages
              </Button>
              <Button color="inherit" component={NavLink} to="/info">
                Info Page
              </Button>
              <Button color="inherit" component={NavLink} to="/lovedoneform">
                Loved one Form
              </Button>
              <Button color="inherit" component={NavLink} to="/careteamform">
                CareTeamForm
              </Button>
              <LogOutButton color="inherit" />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
