import React from "react";
import  { sgMail } from "@sendgrid/mail"
import dotenv from "dotenv";

//import MUI components
import { Button, TextField } from "@mui/material";


function CareTeamForm() {
    //sgMail.setApiKey(process.env.SENDGRID_API_KEY) 

    const sendEmail = () =>  {

        // const email = {
        //     to: 'famlicareappclientproject@gmail.com',
        //     from: 'famlicareappclientproject@gmail.com',
        //     subject: 'Test SendGrid Email',
        //     text: 'Welcome to FamliCare',
        //     html: '<h1>Welcome to FamliCare</h1>',
        // }

        // sgMail.send(email)
        //     .then((response) => console.log('Email Sent Successfully!'))
        //     .catch((error) => console.log(error.email))
    }


    return(
        <div>
            <h1>Create a CareTeam</h1>
            <TextField label='Email' variant="outlined"/>
            <Button onClick={sendEmail}>Send Email!</Button>
        </div>
    )
}

export default CareTeamForm;
