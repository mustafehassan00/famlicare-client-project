import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Box, Typography } from "@mui/material";
import { verifyInvitationCode, clearError } from '../../redux/reducers/actions/careTeam.actions.js'; // Import action creators

/**
 * Component for creating or joining a care team.
 * Allows users to either navigate to a form to add a new loved one or
 * join an existing care team using an invitation code.
 */
function CreateOrJoinCareTeam() {
  const [invitationCode, setInvitationCode] = useState(""); // State to hold the invitation code input
  const history = useHistory(); // Hook to programmatically navigate between routes
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
  
  // Accessing the careTeam state slice to get error and verification status
  const careTeamState= useSelector(state => state.careTeam);
  const error = careTeamState?.error || "";
  const verificationSuccessful = careTeamState?.verificationSuccessful|| false;

  /**
   * Handles navigation to the form for adding a new loved one.
   */
  const handleCreateLovedOne = () => {
    history.push("/lovedoneform");
  };

  /**
   * Handles the submission of the invitation code.
   * Dispatches the verifyInvitationCode action with the input code.
   * @param {Object} e - The event object.
   */
  const handleSubmitInvitationCode = (e) => {
    e.preventDefault();
    dispatch(verifyInvitationCode(invitationCode)); // Dispatch action to verify code
  };

  /**
   * useEffect hook to navigate to the care team dashboard upon successful verification.
   */
  useEffect(() => {
    if (verificationSuccessful) {
      history.push('/care-team-dashboard');
    }
  }, [verificationSuccessful, history]);

  /**
   * useEffect hook to clear any error messages when the component unmounts.
   * This is a cleanup effect to ensure stale errors do not persist across component instances.
   */
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