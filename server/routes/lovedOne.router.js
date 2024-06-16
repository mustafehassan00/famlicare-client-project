const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET routes
 */

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const sqlText = `
    SELECT * FROM loved_ones
    WHERE id=$1
  `;
  const sqlValues = [id];

  try {
    const result = await pool.query(sqlText, sqlValues);
    res.send(result.rows);
  } catch (error) {
    console.log(`Error in GET with query: ${sqlText}`, error);
    res.sendStatus(500); // Send a server error response
  }
});
// --- END GET ROUTES ---

/**
 * POST routes
 */
router.post("/", async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  const sqlText = `
    INSERT INTO loved_ones(first_name, last_name)
    VALUES ($1, $2)
  `;
  const sqlValues = [first_name, last_name];

  try {
    await pool.query(sqlText, sqlValues);
    res
      .status(200)
      .json({ message: `${first_name} ${last_name} added successfully` });
  } catch (error) {
    console.error("Error inserting loved one: ", error);
    res.sendStatus(500);
  }
});

//--- END POST ROUTES ---

/**
 * PUT routes
 */
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let sqlText;
  const sqlValues = [id];

  // Determine which stage of the registration process we're in based on the request body
  if ('age' in req.body && 'main_condition' in req.body) {
    // First stage: Update age and main_condition
    sqlText = `
      UPDATE loved_ones
      SET age = $2, main_condition = $3
      WHERE id = $1
    `;
    sqlValues.push(req.body.age, req.body.main_condition);
  } else if ('street_address' in req.body) {
    // Second stage: Update address information
    sqlText = `
      UPDATE loved_ones
      SET street_address = $2, street_address2 = $3, city = $4, 
          state_province = $5, country = $6, postal_code = $7
      WHERE id = $1
    `;
    sqlValues.push(req.body.street_address, req.body.street_address2, req.body.city, 
                   req.body.state_province, req.body.country, req.body.postal_code);
  } else {
    // If the request doesn't match the expected fields for either stage
    return res.status(400).json({ message: "Invalid request data for update." });
  }

  try {
    await pool.query(sqlText, sqlValues);
    res.status(200).json({ message: "Loved one updated successfully" });
  } catch (error) {
    console.error("Error updating loved one: ", error);
    res.sendStatus(500);
  }
});
//--- END PUT ROUTES ---

/**
 * DELETE routes
 */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const sqlText = `DELETE FROM loved_ones WHERE id = $1`;
  const sqlValues = [id];
  try {
    await pool.query(sqlText, sqlValues);
    res.status(200).json({ message: "Loved one removed successfully" });
  } catch (error) {
    console.log(`Error in DELETE with query: ${sqlText}`, error);
    res.sendStatus(500);
  }
});
//--- END DELETE ROUTES

module.exports = router;
