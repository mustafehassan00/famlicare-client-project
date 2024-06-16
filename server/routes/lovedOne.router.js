const express = require("express");
const {body, validationResult} = require("express-validator")
const pool = require("../modules/pool");
const router = express.Router();
// Middleware for checking if the user is authenticated
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET routes
 */

// GET route to retrieve a specific loved one by their ID
// Requires user to be authenticated
// Troubleshooting: Ensure the ID passed is valid and exists in the database
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const id = req.params.id; // Extracting the ID from the request parameters
  const sqlText = `
    SELECT * FROM loved_ones
    WHERE id=$1
  `; // SQL query to select a loved one by ID
  const sqlValues = [id]; // Parameters for the SQL query

  try {
    const result = await pool.query(sqlText, sqlValues); // Execute the query
    // Maintenance: Check for empty result set and handle accordingly
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Loved one not found" });
    }
    res.send(result.rows); // Send the result back to the client
  } catch (error) {
    console.log(`Error in GET with query: ${sqlText}`, error);
    res.sendStatus(500); // Send a server error response
  }
});
// --- END GET ROUTES ---

/**
 * POST routes
 */

// POST route to add a new loved one
// Requires user to be authenticated
// Troubleshooting: Ensure that first_name and last_name are not null or empty
router.post(
  "/",
  rejectUnauthenticated,
  [
    body('first_name')
      .trim()
      .isString().withMessage('First name must be a string')
      .isLength({max:100}).withMessage('First name must be less than 100 characters')
      .notEmpty().withMessage('First name is required'),
    body('last_name')
    .trim()
    .isString().withMessage('Last name must be a string')
    .isLength({ max: 100 }).withMessage('Last name must be less than 100 characters')
    .notEmpty().withMessage('Last name is required'),    // Add more validators as needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    const first_name = req.body.first_name; // Extract first name from request body
  const last_name = req.body.last_name; // Extract last name from request body
  const userId = req.user.id; // Assuming req.user is populated from authentication middleware

  const insertSQLText = `
    INSERT INTO loved_ones(first_name, last_name)
    VALUES ($1, $2)
    RETURNING id; --Return the new ID
  `; // SQL query to insert a new loved one
  const sqlValues = [first_name, last_name]; // Parameters for the SQL query

  try {
    const insertResult = await pool.query(insertSQLText, sqlValues); // Execute the query
    const lovedOneId= insertResult.rows[0].id;
    // Maintenance: Ensure lovedOneId is correctly retrieved before proceeding
    const updateSQL = `
    UPDATE "user"
    SET loved_one_id = $1
    WHERE id = $2 
    `;

    await pool.query(updateSQL, [lovedOneId, userId]);

    res
      .status(200)
      .json({ message: `${first_name} ${last_name} was added successfully` }); // Send success response
  } catch (error) {
    console.error("Error inserting loved one: ", error);
    res.sendStatus(500); // Send server error response
  }
});

//--- END POST ROUTES ---

/**
 * PUT routes
 */

// PUT route to update a loved one's information
// Requires user to be authenticated
// Troubleshooting: Ensure the provided ID matches an existing record
router.put('/:id', rejectUnauthenticated, async (req, res) => {
  const { id } = req.params;
  // Validate 'id' parameter (example: ensure it's a positive integer)
  if (!id || isNaN(id) || id < 1) {
    return res.status(400).json({ message: "Invalid ID provided" });
  }

  const { age, main_condition, street_address, street_address2, city, state_province, country, postal_code } = req.body;

  // Validate body parameters here (example: ensure 'age' is a positive number)
  // This is a simplified example. You should implement comprehensive validation based on your requirements

  let fieldsToUpdate = [];
  let sqlValues = [id];
  let index = 2;

  if (age !== undefined && !isNaN(age) && age > 0) {
    fieldsToUpdate.push(`age = $${index++}`);
    sqlValues.push(age);
  }
  if (main_condition !== undefined && main_condition.trim() !== '') {
    fieldsToUpdate.push(`main_condition = $${index++}`);
    sqlValues.push(main_condition.trim());
  }
  // Add more fields and validations as needed

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: "No valid fields provided for update" });
  }

  const sqlText = `
    UPDATE loved_ones
    SET ${fieldsToUpdate.join(', ')}
    WHERE id = $1;
  `;

  try {
    await pool.query(sqlText, sqlValues);
    res.status(200).json({ message: "Loved one updated successfully" });
  } catch (error) {
    console.error("Error in PUT route: ", error);
    res.sendStatus(500);
  }
});
//--- END PUT ROUTES ---

/**
 * DELETE routes
 */

// DELETE route to remove a loved one by their ID
// Requires user to be authenticated
// Troubleshooting: Verify the ID exists before attempting to delete
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const id = req.params.id; // Extracting the ID from the request parameters
  const sqlText = `DELETE FROM loved_ones WHERE id = $1`; // SQL query to delete a loved one by ID
  const sqlValues = [id]; // Parameters for the SQL query

  try {
    await pool.query(sqlText, sqlValues); // Execute the query
    // Maintenance: Confirm deletion was successful before sending response
    res.status(200).json({ message: "Loved one removed successfully" }); // Send success response
  } catch (error) {
    console.log(`Error in DELETE with query: ${sqlText}`, error);
    res.sendStatus(500); // Send server error response
  }
});
//--- END DELETE ROUTES

// Catch-all route in case of unauthenticated requests
// Sends a 403 Forbidden response
// Maintenance: Ensure this catch-all is always the last route
router.use((req, res) => {
  res.status(403).json({ error: 'You must be authenticated to access this resource.' });
});

module.exports = router; // Export the router for use in other parts of the application