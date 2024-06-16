const express = require("express");
const { body, validationResult } = require("express-validator");
const pool = require("../modules/pool");
const router = express.Router();

// Middleware for checking if the user is authenticated
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// GET route to retrieve a specific loved one by their ID
// Requires user to be authenticated
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const id = req.params.id; // Extracting the ID from the request parameters
  const sqlText = `SELECT * FROM loved_ones WHERE id=$1`; // SQL query to select a loved one by ID
  const sqlValues = [id]; // Parameters for the SQL query

  try {
    const result = await pool.query(sqlText, sqlValues); // Execute the query
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Loved one not found" }); // Handle case where no result is found
    }
    res.send(result.rows); // Send the result back to the client
  } catch (error) {
    console.log(`Error in GET with query: ${sqlText}`, error);
    res.sendStatus(500); // Send a server error response on failure
  }
});

// POST route to add a new loved one
// Requires user to be authenticated
router.post(
  "/",
  rejectUnauthenticated,
  [
    // Validation middleware to ensure first_name and last_name meet criteria
    body("first_name").trim().isString().withMessage("First name must be a string").isLength({ max: 100 }).withMessage("First name must be less than 100 characters").notEmpty().withMessage("First name is required"),
    body("last_name").trim().isString().withMessage("Last name must be a string").isLength({ max: 100 }).withMessage("Last name must be less than 100 characters").notEmpty().withMessage("Last name is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
    }
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const userId = req.user.id; // Assuming req.user is populated from authentication middleware

    const client = await pool.connect(); // Start a database client from the pool

    try {
      await client.query("BEGIN"); // Begin the transaction

      const insertSQLText = `INSERT INTO loved_ones(first_name, last_name) VALUES ($1, $2) RETURNING id;`; // SQL query to insert a new loved one
      const insertResult = await client.query(insertSQLText, [first_name, last_name]);
      const lovedOneId = insertResult.rows[0].id; // Retrieve the new loved one's ID

      const updateSQL = `UPDATE "user" SET loved_one_id = $1, is_admin=true WHERE id = $2`; // SQL query to update the user with the new loved one's ID, and toggle admin
      await client.query(updateSQL, [lovedOneId, userId]);

      await client.query("COMMIT"); // Commit the transaction
      res.status(200).json({ message: `${first_name} ${last_name} was added successfully` }); // Respond with success message
    } catch (error) {
      await client.query("ROLLBACK"); // Roll back the transaction on error
      console.error("Error in transaction inserting loved one: ", error);
      res.sendStatus(500); // Respond with server error on failure
    } finally {
      client.release(); // Release the client back to the pool
    }
  }
);

// PUT route to update a loved one's information
// Requires user to be authenticated
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const { id } = req.params; // Extract the ID from request parameters
  // Validate 'id' parameter (example: ensure it's a positive integer)
  if (!id || isNaN(id) || id < 1) {
    return res.status(400).json({ message: "Invalid ID provided" }); // Validate the ID is correct
  }

  // Extract fields from request body
  const { age, main_condition, street_address, street_address2, city, state_province, country, postal_code } = req.body;

  let fieldsToUpdate = []; // Initialize an array to hold SQL fields to update
  let sqlValues = [id]; // Initialize SQL values array with the ID as the first parameter
  let index = 2; // Start SQL parameter indexing at 2

  // Conditional checks for each field to determine if they should be included in the update
  if (age !== undefined && !isNaN(age) && age > 0) {
    fieldsToUpdate.push(`age = $${index++}`);
    sqlValues.push(age);
  }
  if (main_condition !== undefined && main_condition.trim() !== "") {
    fieldsToUpdate.push(`main_condition = $${index++}`);
    sqlValues.push(main_condition.trim());
  }
  // Add more fields and validations as needed

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: "No valid fields provided for update" }); // Return error if no valid fields are provided
  }

  const sqlText = `UPDATE loved_ones SET ${fieldsToUpdate.join(", ")} WHERE id = $1;`; // Construct the SQL query

  try {
    await pool.query(sqlText, sqlValues); // Execute the update query
    res.status(200).json({ message: "Loved one updated successfully" }); // Respond with success message
  } catch (error) {
    console.error("Error in PUT route: ", error);
    res.sendStatus(500); // Respond with server error on failure
  }
});

// DELETE route to remove a loved one by their ID
// Requires user to be authenticated
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const id = parseInt(req.params.id); // Parse the ID from request parameters
  const userId = req.user.id; // Assuming 'req.user' is populated from your authentication middleware

  // Validate 'id' parameter
  if (!id || isNaN(id) || id < 1) {
    return res.status(400).json({ message: "Invalid ID provided" }); // Validate the ID is correct
  }

  const client = await pool.connect(); // Start a database client from the pool

  try {
    await client.query('BEGIN'); // Begin the transaction

    // Fetch the user's 'is_admin' status within the transaction
    const userQuery = `SELECT is_admin FROM users WHERE id = $1`;
    const userResult = await client.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      // User not found, rollback transaction
      await client.query('ROLLBACK');
      return res.status(404).json({ message: "User not found" }); // Respond with user not found message
    }

    const { is_admin } = userResult.rows[0]; // Extract 'is_admin' status

    if (!is_admin) {
      // User is not an admin, deny the DELETE operation and rollback transaction
      await client.query('ROLLBACK');
      return res.status(403).json({ message: "Unauthorized to perform this action" }); // Respond with unauthorized message
    }

    // User is authenticated and authorized, proceed with the DELETE operation
    const deleteQuery = `DELETE FROM loved_ones WHERE id = $1`;
    await client.query(deleteQuery, [id]);

    await client.query('COMMIT'); // Commit the transaction
    res.status(200).json({ message: "Loved one deleted successfully" }); // Respond with success message
  } catch (error) {
    await client.query('ROLLBACK'); // Roll back the transaction on error
    console.error("Error in DELETE operation: ", error);
    res.status(500).json({ message: "Server error" }); // Respond with server error on failure
  } finally {
    client.release(); // Release the client back to the pool
  }
});

module.exports = router; // Export the router for use in other parts of the application