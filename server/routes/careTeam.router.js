const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
require("dotenv").config();

// Setup for SendGrid to send emails
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * GET route to fetch care team members by loved one's ID
 * This route retrieves a list of care team members associated with a specific loved one.
 */
router.get('/members/:lovedOneId', (req, res) => {
  const lovedOneId = req.params.lovedOneId;
  const sqlText = `SELECT first_name, last_name, email FROM "user" WHERE loved_one_id = $1`;
  
  pool.query(sqlText, [lovedOneId])
    .then(result => {
      res.json(result.rows);
    })
    .catch(error => {
      console.log('Error fetching care team members:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route to invite a new user to the care team
 * This route handles the creation of an invitation for a new user to join a care team.
 * It inserts the invitation into the database and sends an email with the invitation code.
 */
router.post("/", (req, res) => {
  const userEmail = req.body.email; // Email of the user to invite
  const lovedOneId = req.user.loved_one_id; // ID of the loved one associated with the care team

  // SQL query to insert the new invitation into the database
  const sqlText = `INSERT INTO invitations("email", "loved_one_id")
                        VALUES
                            ($1, $2)
                        RETURNING invitation_code;`;
  const sqlValues = [userEmail, lovedOneId];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      // Send the email with the invitation code
      const invitationCode = dbRes.rows[0].invitation_code;
      const email = {
        to: userEmail,
        from: {
          name: "FamliCare App",
          email: "famlicareappclientproject@gmail.com",
        },
        subject: "Your FamliCare App CareTeam Invitation Code!",
        text: `Welcome to FamliCare. Your Invitation Code is: ${invitationCode}.`,
        html: `<h1>Welcome to FamliCare</h1>
                    <h2>Your Invitation Code is: ${invitationCode}</h2>
                    <p>You have been invited to join a FamliCare CareTeam. Please go to the FamliCare App
                     to make a new account. Copy and paste this code when prompted to join the CareTeam</p>
                     <h3>Thank you, FamliCare App</h3>`,
      };

      sgMail
        .send(email)
        .then(() => console.log("Email Sent Successfully!"))
        .catch((error) => console.log("Error sending email:", error.message)); // Improved error logging for email sending
      res.sendStatus(201); // Success response
    })
    .catch((error) => {
      console.log("POST add invited user error:", error); // Log error for troubleshooting
      res.sendStatus(500); // Internal server error response
    });
});

/**
 * POST route to validate and apply an invitation code
 * This route verifies an invitation code and updates the user's record to reflect their membership in the care team.
 * It also deletes the used invitation code from the database to prevent reuse.
 */
router.post('/verify-invitation', async (req, res) => {
  const { invitationCode } = req.body; // Invitation code to verify
  const userId = req.user.id; // ID of the user who is verifying the code

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    // Check if the invitation code is valid
    const checkInvitationSql = `
      SELECT loved_one_id 
      FROM invitations 
      WHERE invitation_code = $1;
    `;
    const invitationResult = await client.query(checkInvitationSql, [invitationCode]);

    if (invitationResult.rows.length === 0) {
      throw new Error('Invalid invitation code'); // Error if code is not found
    }

    const { loved_one_id } = invitationResult.rows[0];

    // Update the user's record with the loved_one_id
    const updateUserSql = `
      UPDATE "user"
      SET loved_one_id = $1, 
          is_admin = false
      WHERE id = $2
      RETURNING id, username, first_name, last_name, email, phone_number, profile_picture_url, loved_one_id, is_admin;
    `;
    const updateResult = await client.query(updateUserSql, [loved_one_id, userId]);

    // Delete the used invitation
    const deleteInvitationSql = `
      DELETE FROM invitations
      WHERE invitation_code = $1;
    `;
    await client.query(deleteInvitationSql, [invitationCode]);

    await client.query('COMMIT'); // Commit transaction

    res.status(200).json(updateResult.rows[0]); // Return updated user info
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback transaction in case of error
    console.log('Error verifying invitation code:', error); // Log error for troubleshooting
    res.status(400).json({ message: error.message }); // Return error message
  } finally {
    client.release(); // Release client back to the pool
  }
});

module.exports = router;