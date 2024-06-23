import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm1 from "../RegisterForm/RegisterForm1";
import {
  Container,
  Typography,
  Button,
  useTheme,
  Avatar,
  Grid,
  TextField,
} from "@mui/material";

function RegisterPage1() {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.goBack()}> ⬅️ </button>
      <button
        onClick={() => {
          history.push("/registerpage/registerpage2");
        }}
      >
        {" "}
        ➡️{" "}
      </button>
      <br></br>
      <Typography variant="h2">Enter your phone number</Typography>
      <br></br>

      <RegisterForm1 />
    </div>
  );
}

export default RegisterPage1;
