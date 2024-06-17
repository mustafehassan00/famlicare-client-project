import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'


//import MUI components
import { Button, TextField } from "@mui/material";


function CareTeamForm() {
    
    //Declare new state for the invitedUsers Email 
    const [invitedUserEmailInput, setInvitedUserEmailInput] = useState('')

    const dispatch = useDispatch()

    const sendEmail = () =>  {
        //onClick send a dispatch to invitee invited users table 
        console.log('send email clicked! email is:', invitedUserEmailInput)
        dispatch({
            type: 'SEND_EMAIL_TO_INVITED_USER',
            payload: {
                email:invitedUserEmailInput,
            }
        })
        setInvitedUserEmailInput('')
       
    }


    return(
        <div>
            <h1>Create a CareTeam</h1>
            <TextField 
                onChange={(e) => setInvitedUserEmailInput(e.target.value)}
                label='Email' 
                variant="outlined"/>
            <Button onClick={sendEmail}>Send Email</Button>
        </div>
    )
}

export default CareTeamForm;
