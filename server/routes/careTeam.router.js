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

    const email = {
      to: `${req.body.email}`,
      from: 'famlicareappclientproject@gmail.com',
      subject: 'Test SendGrid Email',
      text: 'Welcome to FamliCare',
      html: '<h1>Welcome to FamliCare</h1>',
  }

  sgMail.send(email)
      .then((response) => console.log('Email Sent Successfully!'))
      .catch((error) => console.log(error.email))
});

module.exports = router;
