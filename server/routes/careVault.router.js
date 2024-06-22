const express = require("express");
const router = express.Router();
const multer = require("multer"); // Used for handling multipart/form-data, primarily used for uploading files.
const pool = require("../modules/pool"); // Pooling client connections to PostgreSQL database.
const AWS = require("aws-sdk"); // AWS SDK to interact with Amazon Web Services like S3.
const { isAdmin } = require("../modules/isAdmin"); // Custom middleware to check if the user is an admin.
const passport = require("passport"); // Authentication middleware for Node.js.
require("dotenv").config(); // Loads environment variables from a .env file into process.env.
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware"); // Middleware to reject unauthenticated requests.

// Setup multer for memory storage
const storage = multer.memoryStorage(); // Stores files in memory as Buffer objects.
const upload = multer({ storage }); // Initializes multer with memory storage.

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS Access Key ID.
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS Secret Access Key.
  region: process.env.AWS_REGION, // The region your S3 bucket is in.
});

const s3 = new AWS.S3(); // Initialize a new instance of S3.

// Function to upload files to AWS S3
const s3Uploadv2 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // The name of your S3 bucket.
    Key: `uploads/${file.originalname}`, // The name of the file within your bucket.
    Body: file.buffer, // The file itself, as a buffer.
    ContentType: file.mimetype, // The MIME type of the file.
  };
  // Note: Consider adding error handling here for S3 upload issues.
  return await s3.upload(params).promise(); // Returns a promise that resolves with the details of the upload.
};

// Function to generate a presigned URL for accessing a file
const getPresignedURL = (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name.
    Key: fileName, // The file path in your bucket.
    Expires: 60 * 60, // URL expiry time in seconds (1 hour).
  };
  // Note: Adjust the Expires value based on your application's needs.
  return s3.getSignedUrl("getObject", params); // Generates a presigned URL for downloading the file.
};

/// Route to get a pre-signed URL for a file
router.get("/file/:id", rejectUnauthenticated, async (req, res) => {
  const fileId = req.params.id;
  try {
    const query = "SELECT * FROM vault WHERE id = $1";
    const result = await pool.query(query, [fileId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "File not found" }); // File not found in the database.
    }

    const file = result.rows[0];
    const url = getPresignedURL(`uploads/${file.document_name}`);

    res.json({ url, fileName: file.document_name });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    res.status(500).json({ message: "Error accessing file" }); // Internal server error, possibly database or AWS S3 issue.
  }
});

// Route to upload a file
router.post(
  "/upload",
  upload.single("file"), // Middleware to handle single file upload under the "file" field name.
  rejectUnauthenticated,
  async (req, res) => {
    const file = req.file; // The uploaded file.
    const lovedOneId = req.body.lovedOneId; // Extract lovedOneId from the form data.

    // Validate file and lovedOneId presence
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (!lovedOneId) {
      return res.status(400).json({ message: "lovedOneId is required" });
    }

    // Proceed with file type validation
    const disallowedMimeTypes = [
      'audio/aac',
      'audio/midi',
      'audio/x-midi',
      'audio/mpeg',
      'audio/ogg',
      'audio/opus',
      'audio/wav',
      'audio/webm',
      'video/x-msvideo',
      'video/mp4',
      'video/mpeg',
      'video/ogg',
      'video/webm',
      'video/3gpp',
      'video/3gpp2'
    ];

    if (disallowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: "Invalid file type. Audio and video files are not allowed." });
    }

    try {
      const result = await s3Uploadv2(file); // Upload the file to S3.
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
        file.mimetype.split("/")[1], // Extracts the file type from the MIME type.
        file.size,
        result.Location, // The URL of the uploaded file in S3.
      ];

      const dbResult = await pool.query(queryText, queryParams); // Insert file metadata into the database.

      res.json({ status: "success", file: dbResult.rows[0] });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.sendStatus(500); // Internal server error, possibly due to database or AWS S3 issues.
    }
  }
);

      
// Route to delete a file
router.delete(
  "/delete/:id",
  rejectUnauthenticated,
  isAdmin, // Ensure the user is an admin before allowing deletion.
  async (req, res) => {
    const fileId = req.params.id;

    try {
      const selectQuery = `
      SELECT * FROM vault 
      WHERE id = $1;
    `;
      const selectResult = await pool.query(selectQuery, [fileId]);

      if (selectResult.rowCount === 0) {
        return res.sendStatus(404); // File not found in the database.
      }

      const file = selectResult.rows[0];
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${file.document_name}`,
      };

      await s3.deleteObject(params).promise(); // Delete the file from S3.
      console.log("File deleted from S3");

      const deleteQuery = `
      DELETE FROM vault
      WHERE id = $1;
    `;
      await pool.query(deleteQuery, [fileId]); // Delete the file metadata from the database.
      console.log("File deleted from database");

      res.sendStatus(200); // Successfully deleted the file.
    } catch (error) {
      console.error("Error in database:", error);
      res.sendStatus(500); // Internal server error, possibly due to database issues.
    }
  }
);

// Route to retrieve all files
router.get("/files", rejectUnauthenticated, async (req, res) => {
  console.log("Fetching files for user:", req.user.id);
  
  const queryText = `
    SELECT DISTINCT ON (v.id)
    v.id, v.document_name, v.document_type, v.file_size, v.attachment_URL, v.uploaded_timestamp 
    FROM vault v
    JOIN "user" u ON v.loved_one_id = u.loved_one_id
    WHERE u.id = $1
    ORDER BY v.id, v.uploaded_timestamp DESC;
  `;

  try {
    const result = await pool.query(queryText, [req.user.id]); // Retrieve files associated with the user.
    console.log("Query result:", result.rows);
    res.send(result.rows); // Send the list of files to the client.
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.sendStatus(500); // Internal server error, possibly due to database issues.
  }
});

module.exports = router;