const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../modules/pool");
const AWS = require("aws-sdk");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const s3Uploadv2 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return await s3.upload(params).promise();
};

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  const lovedOneId = req.body.lovedOneId;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const result = await s3Uploadv2(file);
    const queryText = `
      INSERT INTO vault 
      (loved_one_id, document_name, document_type, file_size, attachment_URL) 
      VALUES 
      ($1, $2, $3, $4, $5);
    `;
    const queryParams = [
      lovedOneId,
      file.originalname,
      file.mimetype,
      file.size,
      result.Location,
    ];

    const dbResult = await pool.query(queryText, queryParams);

    res.json({ status: "success", file: dbResult.rows[0] });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    const queryText = `
    DELETE FROM vault 
    WHERE id = $1;`;
    const dbResult = await pool.query(queryText, [fileId]);

    if (dbResult.rowCount === 0) {
      return res.sendStatus(404);
    }

    const file = dbResult.rows[0];
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.attachment_URL.split("/").slice(-2).join("/"),
    };

    await s3.deleteObject(params).promise();
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting file:", error);
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
    console.error("Error retrieving files:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
