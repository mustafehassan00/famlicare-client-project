import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Typography, Button, useTheme,Avatar,Grid,TextField } from '@mui/material';

function RegisterForm2() {
  const [image, setimage] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const Continue = (event) => {
    dispatch({
      type: "IMAGE",
      payload: {
        image: image,
      },
    });
    history.push("/registerpage/registerpage3");
  }; // end registerUser

  return (
    <>
      <div>
      <br></br>
        <Typography variant="h2">Upload your profile picture</Typography>
        <br></br>
        <div>
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Profile Picture"
          src="/path/to/profile-image.jpg"
         
        />
          <label htmlFor="image">

            <input
              type="image"
              name="image"
              value={image}
              placeholder="image url"
              required
              onChange={(event) => setimage(event.target.value)}
            />
          </label>
        </div>
      </div>
      <Button onClick={Continue} variant="contained" className="primary on">Continue</Button>
    </>
  );
}

export default RegisterForm2;
