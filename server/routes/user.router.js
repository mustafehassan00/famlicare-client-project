const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// Multer setup
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'images')); // Destination folder where files will be stored
  },
  
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage });

// Route for handling image upload
router.post('/', upload.single('photo'), (req, res) => {
  // Multer middleware will add `req.file` containing information about the uploaded file
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Logic to handle the uploaded file (e.g., save file path to database)
  const filePath = req.file.path;
  res.status(200).json({ message: 'File uploaded successfully', filePath: filePath });
});




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
