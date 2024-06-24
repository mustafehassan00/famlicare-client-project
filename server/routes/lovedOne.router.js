const express = require("express");
const { body, validationResult } = require("express-validator");
const pool = require("../modules/pool");
const router = express.Router();

// Middleware for checking if the user is authenticated
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

/**
 * GET route to retrieve a specific loved one by their ID.
 * Requires user to be authenticated.
 */
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const id = req.params.id; // Extracting the ID from the request parameters
  const sqlText = `SELECT * FROM loved_ones WHERE id=$1;`; // SQL query to select a loved one by ID
  const sqlValues = [id]; // Parameters for the SQL query

  try {
    const result = await pool.query(sqlText, sqlValues); // Execute the query
    if (result.rows.length === 0) {
      // Handle case where no result is found
      return res.status(404).json({ message: "Loved one not found" });
    }
    // Send the result back to the client
    res.send(result.rows);
  } catch (error) {
    // Log and send server error response on failure
    console.error(`Error in GET with query: ${sqlText}`, error);
    res.sendStatus(500);
  }
});

/**
 * POST route to add a new loved one.
 * Requires user to be authenticated.
 * Includes input validation for first_name and last_name.
 */
router.post(
  "/",
  rejectUnauthenticated,
  [
    // Validate all fields as per the database schema
    body("first_name").trim().isString().withMessage("First name must be a string").isLength({ max: 100 }).withMessage("First name must be less than 100 characters").notEmpty().withMessage("First name is required"),
    body("last_name").trim().isString().withMessage("Last name must be a string").isLength({ max: 100 }).withMessage("Last name must be less than 100 characters").notEmpty().withMessage("Last name is required"),
    body("age").optional().isInt({ min: 0 }).withMessage("Age must be a positive integer"),
    body("main_condition").optional().trim().isString().withMessage("Main condition must be a string"),
    body("street_address").optional().trim().isString().withMessage("Street address must be a string").isLength({ max: 255 }),
    body("street_address2").optional().trim().isString().withMessage("Street address 2 must be a string").isLength({ max: 255 }),
    body("city").optional().trim().isString().withMessage("City must be a string").isLength({ max: 255 }),
    body("state_province").optional().trim().isString().withMessage("State/Province must be a string").isLength({ max: 255 }),
    body("country").optional().trim().isString().withMessage("Country must be a string").isLength({ max: 255 }),
    body("postal_code").optional().trim().isString().withMessage("Postal code must be a string").isLength({ max: 100 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, age, main_condition, street_address, street_address2, city, state_province, country, postal_code } = req.body;
    const userId = req.user.id;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const insertSQLText = `
        INSERT INTO loved_ones(first_name, last_name, age, main_condition, street_address, street_address2, city, state_province, country, postal_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
      const insertResult = await client.query(insertSQLText, [first_name, last_name, age, main_condition, street_address, street_address2, city, state_province, country, postal_code]);
      const lovedOne = insertResult.rows[0];

      await client.query("COMMIT");
      res.status(200).json(lovedOne);
      console.log(lovedOne); // Log the entire loved one object
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error in transaction inserting loved one: ", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
);

/**
 * PUT route to update a loved one's information.
 * Requires user to be authenticated.
 * Validates 'id' parameter and request body fields before updating.
 */
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const { id } = req.params; // Extract the ID from request parameters
  // Validate 'id' parameter (example: ensure it's a positive integer)
  if (!id || isNaN(id) || id < 1) {
    return res.status(400).json({ message: "Invalid ID provided" }); // Validate the ID is correct
  }

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
    // Return error if no valid fields are provided
    return res.status(400).json({ message: "No valid fields provided for update" });
  }

  const sqlText = `UPDATE loved_ones SET ${fieldsToUpdate.join(", ")} WHERE id = $1;`; // Construct the SQL query

  try {
    await pool.query(sqlText, sqlValues); // Execute the update query

    // After updating, fetch the updated data
    const selectSqlText = `SELECT * FROM loved_ones WHERE id = $1;`;
    const result = await pool.query(selectSqlText, [id]);

    if (result.rows.length > 0) {
      // Return the updated data
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Loved one not found" });
    }
  } catch (error) {
    console.error("Error in PUT route: ", error); // Log for maintenance
    res.sendStatus(500); // Respond with server error on failure
  }
});

/**
 * DELETE route to remove a loved one by their ID.
 * Requires user to be authenticated and checks if the user is an admin.
 */
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
    const userQuery = `SELECT is_admin FROM "user" WHERE id = $1;`;
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
    console.error("Error in DELETE operation: ", error); // Log for maintenance
    res.status(500).json({ message: "Server error" }); // Respond with server error on failure
  } finally {
    client.release(); // Release the client back to the pool
  }
});

module.exports = router; // Export the router for use in other parts of the application