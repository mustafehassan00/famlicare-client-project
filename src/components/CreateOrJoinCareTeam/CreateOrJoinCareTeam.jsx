import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, TextField, Box, Typography } from "@mui/material";

// Component for creating or joining a care team
function CreateOrjoinCareTeam() {
  // State for storing the invitation code input by the user
  const [invitationCode, setInvitationCode] = useState("");
  // useHistory hook to programmatically navigate to different routes
  const history = useHistory();
  // useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to navigate to the create/join team page
  // Troubleshooting: Ensure the route is correctly defined in your router setup
  const handleCreateLovedOne = () => {
    history.push("/lovedoneform"); 
  };

  // Function to handle form submission
  // Troubleshooting: Verify the "VERIFY_INVITATION_CODE" action is correctly handled in your reducer
  const handleSubmitInvitationCode = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    dispatch({
      type: "VERIFY_INVITATION_CODE",
      payload: { invitationCode },
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", mt: 4 }}>
      {/* Typography for the title */}
      <Typography variant="h4" gutterBottom>
        Care Team Setup
      </Typography>

      {/* Button to add a new loved one */}
      {/* Maintenance: To change the button style, adjust the variant and color props */}
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

      {/* Typography for the section divider */}
      <Typography variant="h6" gutterBottom>
        Or
      </Typography>

      {/* Form for submitting the invitation code */}
      {/* Maintenance: For form validation or additional fields, modify here */}
      <form onSubmit={handleSubmitInvitationCode}>
        <TextField
          fullWidth
          label="Invitation Code"
          variant="outlined"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          sx={{ mb: 2 }}
        />
        {/* Button to submit the form */}
        {/* Troubleshooting: If the button is not responsive, check if the invitationCode state is correctly updated */}
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

export default CreateOrjoinCareTeam;