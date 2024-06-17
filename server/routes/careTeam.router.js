const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config()

const sgMail = require('@sendgrid/mail')
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(SENDGRID_API_KEY)


/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});


router.post('/', (req, res) => {

const userEmail = req.body.email
const lovedOneId = req.user.loved_one_id


  const sqlText = `INSERT INTO invitations("email", "loved_one_id")
	                    VALUES
		                    ($1, $2)
                        RETURNING invitation_code;`

  const sqlValues = [userEmail, lovedOneId]

    pool.query(sqlText,sqlValues)
      .then((dbRes) => {
        //send the email!
        const invitationCode = dbRes.rows[0].invitation_code
          const email = {
            to: `${userEmail}`,
            from: 'famlicareappclientproject@gmail.com',
            subject: 'Test SendGrid Email',
            text: `Welcome to FamliCare. Your Invitation Code is: ${invitationCode}`,
            html: `<h1>Welcome to FamliCare</h1>
                    <h2>Your Invitation Code is: ${invitationCode}`,
        }

        sgMail.send(email)
            .then((response) => console.log('Email Sent Successfully!'))
            .catch((error) => console.log(error.email))
            res.sendStatus(201)
      })
      .catch((error) => {
        console.log('POST add invited user error:', error)
        res.sendStatus(500)
      })

  


});

module.exports = router;
