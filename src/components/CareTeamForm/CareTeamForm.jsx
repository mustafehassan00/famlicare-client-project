import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Container,
} from "@mui/material";

/**
 * Component for managing a care team.
 * Allows admin users to invite new members via email and displays a list of current team members.
 */
function CareTeamForm() {
  // State for storing the email input for inviting a new team member
  const [invitedUserEmailInput, setInvitedUserEmailInput] = useState("");
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();
  // Accessing the current user and care team members from the Redux store
  const user = useSelector((state) => state.user);
  const teamMembers = useSelector((state) => state.careTeam?.members || []);

  /**
   * Fetches care team members when the component mounts.
   * This effect runs once due to an empty dependency array.
   */
  useEffect(() => {
    dispatch({ type: "FETCH_CARE_TEAM_MEMBERS" });
  }, [dispatch]);

  //console logging for testing
  useEffect(() => {
    console.log("Current team members:", teamMembers);
  }, [teamMembers]);

  /**
   * Handles sending an email invitation to a new team member.
   * Dispatches an action with the email input and resets the input field afterwards.
   */
  const sendEmail = () => {
    dispatch({
      type: "SEND_EMAIL_TO_INVITED_USER",
      payload: {
        email: invitedUserEmailInput,
      },
    });
    // Reset the email input field to clear it after sending the invitation
    setInvitedUserEmailInput("");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Care Team
        </Typography>

        {/* List of current team members */}
        <Typography variant="h6" gutterBottom>
          Team Members
        </Typography>
        <List>
          {teamMembers.map((member, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${member.first_name} ${member.last_name}`}
                secondary={member.email}
              />
            </ListItem>
          ))}
        </List>

        {/* Invitation form visible only to admin users */}
        {user.is_admin && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Invite New Member
            </Typography>
            <TextField
              fullWidth
              value={invitedUserEmailInput}
              onChange={(e) => setInvitedUserEmailInput(e.target.value)}
              label="Email"
              placeholder="Member Email"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendEmail}
              fullWidth
            >
              Send Invitation
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default CareTeamForm;
