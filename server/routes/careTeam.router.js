const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
});

//POST route to invite a new user
router.post("/", (req, res) => {
  const userEmail = req.body.email;
  const lovedOneId = req.user.loved_one_id;

  const sqlText = `INSERT INTO invitations("email", "loved_one_id")
	                    VALUES
		                    ($1, $2)
                        RETURNING invitation_code;`;

  const sqlValues = [userEmail, lovedOneId];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      //send the email!
      const invitationCode = dbRes.rows[0].invitation_code;
      const email = {
        to: `${userEmail}`,
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
        .then((response) => console.log("Email Sent Successfully!"))
        .catch((error) => console.log(error.email));
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("POST add invited user error:", error);
      res.sendStatus(500);
    });
});

//POST route to validate invitation codes

router.post('/verify-invitation', async (req, res) => {
  const { invitationCode } = req.body;
  const userId = req.user.id;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Check if the invitation code is valid and get the associated loved_one_id
    const checkInvitationSql = `
      SELECT loved_one_id 
      FROM invitations 
      WHERE invitation_code = $1;
    `;
    const invitationResult = await client.query(checkInvitationSql, [invitationCode]);

    if (invitationResult.rows.length === 0) {
      throw new Error('Invalid invitation code');
    }

    const { loved_one_id } = invitationResult.rows[0];

    // Update the user's record with the loved_one_id and set is_admin to false
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

    await client.query('COMMIT');

    res.status(200).json(updateResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error verifying invitation code:', error);
    res.status(400).json({ message: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;
