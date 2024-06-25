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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import { GET_LOVED_ONE_REQUEST } from "../../redux/reducers/actions/lovedOne.actions";

/**
 * Component for managing a care team.
 * Allows admin users to invite new members via email and displays a list of current team members.
 * 
 * Troubleshooting Tips:
 * - Ensure Redux state is properly initialized and reducers are correctly set up.
 * - Check for any typos in action types and reducer case statements.
 * - Verify that the backend API is correctly handling the requests.
 * 
 * Maintenance Notes:
 * - Keep the Redux state structure in mind when adding new features.
 * - Consider using selectors for more complex state queries.
 * - For UI consistency, adhere to the Material-UI theme provided.
 */
function CareTeamForm() {
  // State for storing the email input for inviting a new team member
  // Consider validating the email format before dispatching the invite action.
  const [invitedUserEmailInput, setInvitedUserEmailInput] = useState("");
  
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();
  
  // Accessing the current user and care team members from the Redux store
  // Ensure these pieces of state are correctly updated in their respective reducers.
  const user = useSelector((state) => state.user);
  const teamMembers = useSelector(
    (state) => state.careTeamReducer?.members || []
  );
  const loved_one_id = useSelector((state) => state.user.loved_one_id);
  const loved_one = useSelector(state=>state.loved_one);
  const [lovedOneName, setLovedOneName] = useState("");

  // Use existing MUI theme for styling consistency
  const theme = useTheme();

  /**
   * Fetches care team members when the component mounts.
   * Ensure the backend endpoint is correctly set up to handle this request.
   */
  useEffect(() => {
    dispatch({ type: "FETCH_CARE_TEAM_MEMBERS" });
  }, [dispatch]);

  /**
   * Fetches loved one info based on the loved_one_id.
   * This effect depends on loved_one_id, so it will run again if loved_one_id changes.
   */
  useEffect(() => {
    if (loved_one_id) {
      dispatch({ type: GET_LOVED_ONE_REQUEST, payload: loved_one_id });
    }
  }, [dispatch, loved_one_id]);

  /**
   * Store the lovedOne's name for quick reference.
   * This effect depends on the loved_one object, updating the name if it changes.
   */
  useEffect(() =>{
    if (loved_one) {
        console.log("Loved one's name: ",loved_one.first_name, loved_one.last_name);
        setLovedOneName(`${loved_one.first_name} ${loved_one.last_name}`);
    }
  }, [loved_one])

  // Console logging for testing - consider removing or commenting out for production.
  useEffect(() => {
    console.log("Current team members:", teamMembers);
  }, [teamMembers]);

  /**
   * Handles sending an email invitation to a new team member.
   * Dispatches an action with the email input and resets the input field afterwards.
   * Ensure the backend service for sending emails is properly configured.
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
          {lovedOneName ?
            `${lovedOneName}'s Care Team`: "Care Team"}
        </Typography>

        {/* List of current team members */}
        <Typography variant="h6" gutterBottom>
          Team Members
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="team members table">
            <TableBody>
              {teamMembers.map((member, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: theme.palette.primary.light,
                      color: "white",
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ justifyContent: "flex-start", color: "inherit" }}
                  >
                    {`${member.first_name} ${member.last_name}`}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "inherit" }}>
                    {member.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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