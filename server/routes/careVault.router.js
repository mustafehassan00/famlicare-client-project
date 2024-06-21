const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../modules/pool");
const AWS = require("aws-sdk");
const { isAdmin } = require("../modules/isAdmin"); // Ensures only admins can access certain routes
const passport = require("passport");
require("dotenv").config(); // Loads environment variables from a .env file
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Setup multer for memory storage to temporarily hold files before uploading to S3
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure AWS SDK with credentials and region from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Function to upload files to AWS S3
const s3Uploadv2 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // S3 bucket name
    Key: `uploads/${file.originalname}`, // File path in S3
    Body: file.buffer, // File content
    ContentType: file.mimetype, // File MIME type
  };
  // Upload file to S3 and return the result
  return await s3.upload(params).promise();
};

// Function to generate a presigned URL for accessing a file
const getPresignedURL = (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Expires: 60 * 60 * 24, // URL expiry time in seconds (24 hours)
  };
  // Generate and return a presigned URL for the file
  return s3.getSignedUrl("getObject", params);
};

// Route to view a file by redirecting to a presigned URL
router.get("/view/:fileName", rejectUnauthenticated, (req, res) => {
  const url = getPresignedURL(`uploads/${req.params.fileName}`);
  res.redirect(url);
});

// Route to share a file by sending a presigned URL
router.get("/share/:filename", rejectUnauthenticated, isAdmin, (req, res) => {
  const url = getPresignedURL(`uploads/${req.params.filename}`);
  res.send({ url });
});

// Route to upload a file
router.post(
  "/upload",
  upload.single("file"),
  rejectUnauthenticated,
  async (req, res) => {
    const file = req.file;
    const lovedOneId = req.body.lovedOneId;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Define allowed MIME types for file uploads
    const allowedMimeTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain",
      "text/html",
      "text/markdown",
      "application/msword", // for .doc files
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for .docx files
      "application/vnd.ms-excel", // for .xls files
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for .xlsx files
      "application/vnd.ms-powerpoint", // for .ppt files
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // for .pptx files
    ];

    // Check if the uploaded file's MIME type is allowed
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    try {
      // Upload file to S3
      const result = await s3Uploadv2(file);
      // Insert file metadata into the database
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
        file.mimetype.split("/")[1], // Extract and use the file's extension as document_type
        file.size,
        result.Location, // S3 URL of the uploaded file
      ];

      const dbResult = await pool.query(queryText, queryParams);

      res.json({ status: "success", file: dbResult.rows[0] });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.sendStatus(500);
    }
  }
);

// Route to delete a file
router.delete(
  "/delete/:id",
  rejectUnauthenticated,
  isAdmin,
  async (req, res) => {
    const fileId = req.params.id;

    try {
      // Retrieve file metadata from the database
      const selectQuery = `
      SELECT * FROM vault 
      WHERE id = $1;
    `;
      const selectResult = await pool.query(selectQuery, [fileId]);

      if (selectResult.rowCount === 0) {
        return res.sendStatus(404); // File not found
      }

      const file = selectResult.rows[0];
      // Delete file from S3
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${file.document_name}`,
      };

      await s3.deleteObject(params).promise();
      console.log("File deleted from S3");

      // Delete file metadata from the database
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
  }
);

// Route to retrieve all files
router.get("/files", rejectUnauthenticated, async (req, res) => {
  user = req.user.id;
  console.log('user ID:', req.user.id);
  const queryText = `
  SELECT DISTINCT ON (v.id)
  v.id, v.document_name, v.document_type, v.file_size, v.attachment_URL, v.uploaded_timestamp 
  FROM vault v
  JOIN "user" u ON v.loved_one_id = u.loved_one_id
  WHERE u.id = $1
  ORDER BY v.id, v.uploaded_timestamp DESC;
`;

  try {
    const result = await pool.query(queryText, [req.user.id]);
    res.send(result.rows);
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.sendStatus(500);
  }
});

// Route for admins to download a file
router.get(
  "/download/:id",
  rejectUnauthenticated,
  isAdmin,
  async (req, res) => {
    const fileId = req.params.id;

    try {
      // Retrieve file metadata from the database
      const selectQuery = `
      SELECT * FROM vault 
      WHERE id = $1;
    `;
      const selectResult = await pool.query(selectQuery, [fileId]);

      if (selectResult.rowCount === 0) {
        return res.sendStatus(404); // File not found
      }

      const file = selectResult.rows[0];
      // Generate a presigned URL for downloading the file
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${file.document_name}`,
        Expires: 60 * 60 * 24, // URL expiry time in seconds (24 hours)
      };

      const url = s3.getSignedUrl("getObject", params);
      res.json({ url });
    } catch (error) {
      console.error("Error generating download URL:", error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
