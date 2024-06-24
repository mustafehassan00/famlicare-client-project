import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, TextField, Box, Typography } from "@mui/material";

function CreateOrjoinCareTeam() {
  const [invitationCode, setInvitationCode] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCreateLovedOne = () => {
    history.push("/create-loved-one"); // Adjust this route as needed
  };

  const handleSubmitInvitationCode = (e) => {
    e.preventDefault();
    dispatch({
      type: "VERIFY_INVITATION_CODE",
      payload: { invitationCode },
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Care Team Setup
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateLovedOne}
          fullWidth
        >
          Add a new Loved One
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Or
      </Typography>

      <form onSubmit={handleSubmitInvitationCode}>
        <TextField
          fullWidth
          label="Invitation Code"
          variant="outlined"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          classname={invitationCode ? "primary" : "primary off"}
        >
          Join an Existing Care Team
        </Button>
      </form>
    </Box>
  );
}

export default CreateOrjoinCareTeam;
