const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../modules/pool");
const app = express();
const storage = multer.memoryStorage();

const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ status: "success" });
  // const file = req.file;
  // const lovedOneId = req.body.lovedOneId;

  try {
    const queryText = `
      INSERT INTO vault 
      (loved_one_id, document_name, document_type, file_size, attachment_URL) 
      VALUES 
      ($1, $2, $3, $4, $5) 
      `;

    const result = pool.query(queryText, [
      lovedOneId,
      file.originalname,
      file.mimetype,
      file.size,
      file.url,
    ]);

    res.send(result.rows[0]);
  } catch (error) {
    console.log("Error saving file:", error);
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    const queryText = `
    DELETE FROM vault 
    WHERE id = $1 
    `;
    const result = await pool.query(queryText, [fileId]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log("Error deleting file:", error);
    res.sendStatus(500);
  }
});

router.get("/files", async (req, res) => {
  const queryText = `
  SELECT 
  id, document_name, document_type, file_size, attachment_URL 
  FROM vault`;

  try {
    const result = await pool.query(queryText);
    res.send(result.rows);
  } catch (error) {
    console.log("Error retrieving files:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
