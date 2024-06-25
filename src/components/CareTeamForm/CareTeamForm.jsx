import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, List, ListItem, ListItemText, Typography } from "@mui/material";

/**
 * Component for displaying and managing a care team.
 * Allows admin users to invite new members via email and displays a list of current team members.
 */
function CareTeamForm() {
    // State to store the input value for the email to invite a new team member
    const [invitedUserEmailInput, setInvitedUserEmailInput] = useState('');
    // Hook to dispatch actions to the Redux store
    const dispatch = useDispatch();
    // Accessing the current user and care team members from the Redux store
    const user = useSelector(state => state.user);
    const teamMembers = useSelector(state => state.careTeam.members);

    // Effect to fetch care team members on component mount
    useEffect(() => {
        dispatch({ type: 'FETCH_CARE_TEAM_MEMBERS' });
    }, [dispatch]);

    /**
     * Handles sending an email invitation to a new team member.
     * Dispatches an action with the email input and resets the input field.
     */
    const sendEmail = () => {
        dispatch({
            type: 'SEND_EMAIL_TO_INVITED_USER',
            payload: {
                email: invitedUserEmailInput,
            }
        });
        // Reset the email input field after sending the invitation
        setInvitedUserEmailInput('');
    };

    return (
        <div>
            <h1>Care Team</h1>
            
            {/* Displaying the list of team members */}
            <Typography variant="h6">Team Members</Typography>
            <List>
                {teamMembers.map((member, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={member.name} secondary={member.email} />
                    </ListItem>
                ))}
            </List>

            {/* Conditionally rendering the invitation section for admin users */}
            {user.is_admin && (
                <div>
                    <Typography variant="h6">Invite New Member</Typography>
                    <TextField
                        value={invitedUserEmailInput} 
                        onChange={(e) => setInvitedUserEmailInput(e.target.value)}
                        label='Email'
                        placeholder='Member Email' 
                        variant="outlined"
                    />
                    <Button onClick={sendEmail}>Send Invitation</Button>
                </div>
            )}
        </div>
    );
}

export default CareTeamForm;