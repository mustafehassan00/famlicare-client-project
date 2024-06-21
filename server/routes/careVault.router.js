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

const getPresignedURL = (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Expires: 60 * 5 // URL expiry time in seconds
  };
  return s3.getSignedUrl('getObject', params);
};

// VIEW (get) route
router.get('/view/:fileName', (req, res) => {
  const url = getPresignedURL(`uploads/${req.params.fileName}`);
  res.redirect(url);
});

// Share Files
router.get('/share/:filename', (req, res) => {
  const url = getPresignedURL(`uploads/${req.params.filename}`);
  res.send({ url });
});

// Upload file
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
      ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const queryParams = [
      lovedOneId,
      file.originalname,
      file.mimetype.split('/')[1], // To match the valid document types in the database
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

// Delete file
router.delete("/delete/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    const selectQuery = `
      SELECT * FROM vault 
      WHERE id = $1;
    `;
    const selectResult = await pool.query(selectQuery, [fileId]);

    if (selectResult.rowCount === 0) {
      return res.sendStatus(404);
    }

    const file = selectResult.rows[0];
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.document_name}`,
    };

    await s3.deleteObject(params).promise();
    console.log("File deleted from S3");

    const deleteQuery = `
      DELETE FROM vault
      WHERE id = $1;
    `;
    await pool.query(deleteQuery, [fileId]);
    console.log("File deleted from database");

    res.sendStatus(200);
  } catch (error) {
    console.error("Error in database:", error);
    res.sendStatus(500);
  }
});

// Retrieve all files
router.get("/files", async (req, res) => {
  const queryText = `
    SELECT 
    id, document_name, document_type, file_size, attachment_URL, uploaded_timestamp 
    FROM vault
    ORDER BY uploaded_timestamp DESC;
  `;

  try {
    const result = await pool.query(queryText);
    res.send(result.rows);
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
