const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../modules/pool"); // PostgreSQL connection pool
const AWS = require("aws-sdk");
require("dotenv").config(); // Loads environment variables from a .env file into process.env

// Setup multer for memory storage, this is useful for temporary storage before uploading to S3
const storage = multer.memoryStorage();
const upload = multer({ storage });

// AWS SDK configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS Access Key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS Secret Access Key
  region: process.env.AWS_REGION, // Your AWS Region
});

const s3 = new AWS.S3(); // Initialize S3 client

// Function to upload a file to AWS S3
const s3Uploadv2 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // The name of your S3 bucket
    Key: `uploads/${file.originalname}`, // The file path in S3
    Body: file.buffer, // The file binary content
    ContentType: file.mimetype, // The file MIME type
  };
  // Upload the file to S3 and return the promise
  return await s3.upload(params).promise();
};

// Function to generate a presigned URL for a file in S3
const getPresignedURL = (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // The name of your S3 bucket
    Key: fileName, // The file path in S3
    Expires: 60 * 60 * 24 // URL expiry time in seconds; expression evaluates to 24 hours
  };
  // Generate and return the presigned URL
  return s3.getSignedUrl('getObject', params);
};

// Route to view a file by redirecting to its presigned URL
router.get('/view/:fileName', (req, res) => {
  const url = getPresignedURL(`uploads/${req.params.fileName}`);
  res.redirect(url); // Redirect the client to the presigned URL
});

// Route to share a file by sending its presigned URL
router.get('/share/:filename', (req, res) => {
  const url = getPresignedURL(`uploads/${req.params.filename}`);
  res.send({ url }); // Send the presigned URL in the response
});

// Route to upload a file
router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file; // The uploaded file
  const lovedOneId = req.body.lovedOneId; // Additional data, e.g., a related entity ID

  // Check if a file was actually uploaded
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Define allowed MIME types for uploaded files
  const allowedMimeTypes = [
    // List of allowed file types
  ];

  // Validate the uploaded file type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return res.status(400).json({ message: "Invalid file type" });
  }

  try {
    // Upload the file to S3
    const result = await s3Uploadv2(file);
    // SQL query to insert file metadata into the database
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
      file.mimetype.split('/')[1], // Extract the file extension from MIME type
      file.size,
      result.Location, // The URL of the uploaded file in S3
    ];

    // Execute the SQL query
    const dbResult = await pool.query(queryText, queryParams);

    // Respond with the inserted file metadata
    res.json({ status: "success", file: dbResult.rows[0] });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Route to delete a file
router.delete("/delete/:id", async (req, res) => {
  const fileId = req.params.id; // The ID of the file to delete

  try {
    // SQL query to select the file from the database
    const selectQuery = `
      SELECT * FROM vault 
      WHERE id = $1;
    `;
    const selectResult = await pool.query(selectQuery, [fileId]);

    // Check if the file exists
    if (selectResult.rowCount === 0) {
      return res.sendStatus(404); // Not Found
    }

    const file = selectResult.rows[0];
    // Parameters for S3 delete operation
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // The name of your S3 bucket
      Key: `uploads/${file.document_name}`, // The file path in S3
    };

    // Delete the file from S3
    await s3.deleteObject(params).promise();
    console.log("File deleted from S3");

    // SQL query to delete the file metadata from the database
    const deleteQuery = `
      DELETE FROM vault
      WHERE id = $1;
    `;
    // Execute the SQL query
    await pool.query(deleteQuery, [fileId]);
    console.log("File deleted from database");

    res.sendStatus(200); // OK
  } catch (error) {
    console.error("Error in database:", error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Route to retrieve all files
router.get("/files", async (req, res) => {
  // SQL query to select all files, ordered by upload timestamp
  const queryText = `
    SELECT 
    id, document_name, document_type, file_size, attachment_URL, uploaded_timestamp 
    FROM vault
    ORDER BY uploaded_timestamp DESC;
  `;

  try {
    // Execute the SQL query
    const result = await pool.query(queryText);
    // Send the query results in the response
    res.send(result.rows);
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Route to download a file by generating a presigned URL
router.get('/download/:id', async (req, res) => {
  const fileId = req.params.id; // The ID of the file to download

  try {
    // SQL query to select the file from the database
    const selectQuery = `
      SELECT * FROM vault 
      WHERE id = $1;
    `;
    const selectResult = await pool.query(selectQuery, [fileId]);

    // Check if the file exists
    if (selectResult.rowCount === 0) {
      return res.sendStatus(404); // Not Found
    }

    const file = selectResult.rows[0];
    // Parameters for generating a presigned URL
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // The name of your S3 bucket
      Key: `uploads/${file.document_name}`, // The file path in S3
      Expires: 60 * 5 // URL expiry time in seconds (5 minutes)
    };

    // Generate and send the presigned URL in the response
    const url = s3.getSignedUrl('getObject', params);
    res.json({ url });
  } catch (error) {
    console.error("Error generating download URL:", error);
    res.sendStatus(500); // Internal Server Error
  }
});

module.exports = router;