const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.registerReducer.username;
  const firstName = req.body.registerReducer.firstName;
  const lastName = req.body.registerReducer.lastName;
  const phoneNumber = req.body.registerReducer.phoneNumber;
  const image = req.body.registerReducer.image;

  
  const password = encryptLib.encryptPassword(req.body.registerReducer.password);
  const email = req.body.registerReducer.emailAddress;
  console.log("DATA in the Server!",req.body.registerReducer);

  const queryText = `INSERT INTO "user" (username, first_name, last_name, email, password, phone_number, profile_picture_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
  pool
    .query(queryText, [username, firstName,lastName,email,password,phoneNumber,image])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// PUT route to update username, email, and phone number
// router.put('/:id', (req, res, next) => {
//   const userId = req.params.id; // Get user ID from URL parameter
//   const { newUsername, newEmail, newPhoneNumber } = req.body; // Destructure updated fields from request body

//   const queryText = `
//     UPDATE "user" 
//     SET username = $1, email = $2, phone_number = $3 
//     WHERE id = $4
//   `;
//   pool
//     .query(queryText, [newUsername, newEmail, newPhoneNumber, userId])
//     .then(() => res.sendStatus(200))
//     .catch((err) => {
//       console.error('Error updating user details:', err);
//       res.sendStatus(500); // Server error
//     });
// });

// GET route to fetch user by ID
router.get('/:id', (req, res, next) => {
  const userId = req.params.id; // Extract user ID from URL parameter
console.log("server id HERE",userId);
console.log(req.params);
  const queryText = `SELECT * FROM "user" WHERE id = $1;`
  pool
    .query(queryText, [userId])
    .then((dbres) => {
      // send back an object of the id selected with propertoes of that id 
      //[0] sends back a single user
      res.send(dbres.rows[0])
      console.log('DB HERE IS WHAT WE GOT,', dbres.rows)
    })
    .catch((err) => {
      console.log('User data GET from db failed: ', err);
      res.sendStatus(500);
    });
});


// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

module.exports = router;
