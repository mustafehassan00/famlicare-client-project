const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Multer setup for file upload
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "images")); // Destination folder where files will be stored
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // File naming convention
  },
});

const upload = multer({ storage: storage });

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.post("/register", (req, res, next) => {
  const username = req.body.registerReducer.username;
  const firstName = req.body.registerReducer.firstName;
  const lastName = req.body.registerReducer.lastName;
  const phoneNumber = req.body.registerReducer.phoneNumber;
  const image = req.body.registerReducer.image;
  console.log("here is THE Registeration object:", req.body.registerReducer);
  const password = encryptLib.encryptPassword(
    req.body.registerReducer.password
  );
  const email = req.body.registerReducer.emailAddress;
  console.log("DATA in the Server!", req.body.registerReducer);
  const queryText = `INSERT INTO "user" (username, first_name, last_name, email, password, phone_number, profile_picture_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
  pool
    .query(queryText, [
      username,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      image,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// PUT route to update username, email, and phone number
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("Received PUT request for user ID:", userId);
  console.log("Request body:", req.body);

  const { username, email, phone_number, first_name, last_name } = req.body;

  const queryText = `
    UPDATE "user" 
    SET username = $1, email = $2, phone_number = $3, first_name = $4, last_name = $5
    WHERE id = $6
    RETURNING *;
  `;

  try {
    const result = await pool.query(queryText, [
      username,
      email,
      phone_number,
      first_name,
      last_name,
      userId,
    ]);

    if (result.rows.length === 0) {
      console.log("No user found with ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = result.rows[0];
    console.log("User updated successfully:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user details:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// GET route to fetch user by ID
router.get("/:id", (req, res, next) => {
  const userId = req.params.id; // Extract user ID from URL parameter
  console.log("server id HERE", userId);
  console.log(req.params);
  const queryText = `SELECT * FROM "user" WHERE id = $1;`;
  pool
    .query(queryText, [userId])
    .then((dbres) => {
      // send back an object of the id selected with propertoes of that id
      //[0] sends back a single user
      res.send(dbres.rows[0]);
      console.log("DB HERE IS WHAT WE GOT,", dbres.rows);
    })
    .catch((err) => {
      console.log("User data GET from db failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
