import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography } from "@mui/material";
import { verifyInvitationCode, clearError } from '../redux/actions/careTeamActions'; // Import action creators

function CreateOrJoinCareTeam() {
  const [invitationCode, setInvitationCode] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  
  // Use useSelector to access relevant parts of the state
  const { error, verificationSuccessful } = useSelector(state => state.careTeam);

  const handleCreateLovedOne = () => {
    history.push("/lovedoneform");
  };

  const handleSubmitInvitationCode = (e) => {
    e.preventDefault();
    dispatch(verifyInvitationCode(invitationCode)); // Use action creator
  };

  // Effect to handle navigation after successful verification
  useEffect(() => {
    if (verificationSuccessful) {
      history.push('/care-team-dashboard');
    }
  }, [verificationSuccessful, history]);

  // Clear any errors when component unmounts
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Care Team Setup
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="tertiary"
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
          error={!!error} // Show error state if there's an error
          helperText={error} // Display error message
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={invitationCode ? "primary" : "primary off"}
        >
          Join an Existing Care Team
        </Button>
      </form>
    </Box>
  );
}

export default CreateOrJoinCareTeam;