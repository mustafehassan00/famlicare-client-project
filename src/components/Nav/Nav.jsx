import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";

function Nav() {
  const user = useSelector((store) => store.user);
  const theme = useTheme();

  return (
    <div className="nav">
      <Link to="/home">
        <img
          src="./PRIMARY Horiz.png"
          alt="FamliCare Logo"
          className="nav-title"
        />
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/messages">
              💬 Messages
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/lovedoneform">
              Loved one form
            </Link>

            <Link className="navLink" to="/careteamform">
              CareTeamForm
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
