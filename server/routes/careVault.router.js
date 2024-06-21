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

// This DELETES both the S3 OBJECTS and the DATABASE!!
// Only DELETES in DATABASE if S3 is confirmed successful!!
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
    try {
      await s3.deleteObject(params).promise();
      console.log("File deleted from S3");
    } catch (s3Error) {
      console.error("Error in S3:", s3Error);
      return res.status(500);
    }

    const deleteQuery = `
      DELETE FROM vault
      WHERE id = $1;
    `;
    await pool.query(deleteQuery, [fileId]);
    console.log("File deleted from database");
    res.status(200);
  } catch (error) {
    console.error("Error in database:", error);
    res.status(500);
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

router.get("/download/:id", async (req, res) => {
  const fileId = req.params.id;
  try {
    const selectQuery = `
    SELECT * FROM vault 
    WHERE id = $1
    `;
    const selectResult = await pool.query(selectQuery, [fileId]);

    if (selectResult.rowCount === 0) {
      return res.status(404);
    }

    const file = selectResult.rows[0];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.document_name}`,
    };

    const s3Object = await s3.getObject(params).promise();

    res.setHeader("Content-Type", file.document_type);
    res.setHeader("Content-Length", file.file_size);

    res.send(s3Object.Body);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500);
  }
});

module.exports = router;
