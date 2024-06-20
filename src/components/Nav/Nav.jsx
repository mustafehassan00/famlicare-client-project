import React from "react";
import { NavLink } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
// import "./Nav.css";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box, Button, useTheme } from "@mui/material";
import famliCareLogo from './PRIMARY_Horiz.png';

function Nav() {
  const user = useSelector((store) => store.user);
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ marginBottom: theme.spacing(2) }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center"}}>
          <NavLink
            to="/home"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
          >
            <img
              src={famliCareLogo}
              alt="FamliCare Logo"
              style={{ maxHeight: "100px", backgroundColor: "white", borderRadius: 18}}
            />
          </NavLink>
        </Box>
        <Box>
          {!user.id && (
            <Button color="secondary" component={NavLink} to="/login" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
              Login / Register
            </Button>
          )}
          {user.id && (
            <>
              <Button color="inherit" component={NavLink} to="/user" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                Home
              </Button>
              <Button color="inherit" component={NavLink} to="/messages" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                💬 Messages
              </Button>
              <Button color="inherit" component={NavLink} to="/info" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                Info Page
              </Button>
              <Button color="inherit" component={NavLink} to="/lovedoneform" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                Loved one Form
              </Button>
              <Button color="inherit" component={NavLink} to="/careteamform" sx={{ typography: 'h2', margin: theme.spacing(1)}}>
                CareTeamForm
              </Button>
              <LogOutButton color="secondary" className="primary"/>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
