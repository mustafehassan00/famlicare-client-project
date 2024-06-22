/**
 * CareVault Component
 * 
 * This component renders the CareVault interface and handles user interactions.
 * 
 * Troubleshooting:
 * - Check Redux state and action dispatches using Redux DevTools.
 * - Verify that admin permissions are correctly set in the user state.
 * - Ensure all required props are passed to child components.
 * 
 * Maintenance:
 * - Regularly review and update the list of allowed file types.
 * - Consider implementing file type icons for better visual representation.
 * - Optimize rendering performance for large file lists.
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
  Modal,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import axios from "axios";

// Custom styled input component for file upload
const Input = styled("input")(({ theme }) => ({
  display: "none",
}));

function CareVault() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [fileError, setFileError] = useState("");
  const [viewingFile, setViewingFile] = useState(null);

  const dispatch = useDispatch();
  const files = useSelector((state) => state.careVault.files);
  const isLoading = useSelector((state) => state.careVault.isLoading);
  const error = useSelector((state) => state.careVault.error);
  const currentFileUrl = useSelector((state) => state.careVault.currentFileUrl);
  const theme = useTheme();
  const is_admin = useSelector((state) => state.user.is_admin);
  const lovedOneId = useSelector((state) => state.user.loved_one_id);

  // useEffect hook to fetch files on component mount
useEffect(() => {
  dispatch({ type: "FETCH_FILES" }); // Dispatches action to fetch files from the backend
}, [dispatch]); // Dependency array with dispatch to avoid unnecessary re-renders

// Handles file selection change
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0]; // Access the file selected by the user
  if (selectedFile) {
    // Check if the selected file is an audio or video file
    if (
      selectedFile.type.startsWith("audio/") ||
      selectedFile.type.startsWith("video/")
    ) {
      setFileError("Audio and video files are not allowed."); // Set error for unsupported file types
      setFile(null); // Reset file state
      setFilename(""); // Reset filename state
    } else {
      setFile(selectedFile); // Set selected file to state
      setFilename(selectedFile.name); // Set filename to state
      setFileError(""); // Clear any existing errors
    }
  }
};

// Handles the upload button click
const handleUpload = () => {
  if (file) {
    dispatch({ type: "UPLOAD_FILES", payload: { file, lovedOneId } }); // Dispatch action to upload file
    setFile(null); // Reset file state after upload
    setFilename(""); // Reset filename state after upload
    setFileError(""); // Clear any existing errors
  }
};

// Handles viewing a file
const handleViewFile = (fileId) => {
  dispatch({ type: "GET_FILE_URL", payload: { id: fileId } }); // Dispatch action to get file URL
  setViewingFile(files.find((f) => f.id === fileId)); // Set the viewing file state to the selected file
};

// Handles closing the file viewer modal
const handleCloseViewer = () => {
  setViewingFile(null); // Reset viewing file state to close the modal
};

// Handles file deletion
const handleDeleteFile = (fileId) => {
  if (is_admin) { // Check if the user is an admin
    if (window.confirm("Are you sure you want to delete this file?")) { // Confirm deletion with the user
      dispatch({ type: "DELETE_FILES", payload: { id: fileId } }); // Dispatch action to delete file
    }
  } else {
    alert("Only admins can delete files."); // Alert if the user is not an admin
  }
};

// Handles file download
const handleDownload = async (id, fileName) => {
  if (is_admin) { // Ensure the user is an admin
    try {
      const response = await dispatch({ type: "GET_FILE_URL", payload: { id, fileName } });
      // Assuming the action returns the file URL in the response
      const fileUrl = response.payload.url; // Adjust according to your state management
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName); // Set the filename for the download
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file.");
    }
  } else {
    alert("Only admins can download files."); // Alert if the user is not an admin
  }
};

// Handles file sharing
// Corrected handleShare function using the Web Share API to trigger built-in browser sharing functionality.
const handleShare = async (fileId) => {
  if (is_admin) { // Check if the user is an admin
    try {
      // Assuming dispatch returns the file URL to be shared
      const response = await dispatch({ type: "SHARE_FILES", payload: { id: fileId } });
      const fileUrl = response.payload.url; // Adjust according to your state management

      if (navigator.share) {
        // Use the Web Share API
        navigator.share({
          title: 'Share File', // Optional: Title of the file to share
          url: fileUrl, // URL of the file to share
        }).then(() => {
          alert('File shared successfully');
        }).catch((error) => {
          console.error('Error sharing file:', error);
        });
      } else {
        // Fallback or inform the user
        alert("Your browser does not support direct sharing. Please copy the link: " + fileUrl);
      }
    } catch (error) {
      console.error("Error sharing file:", error);
      alert("Failed to share file."); // Inform the user of failure
    }
  } else {
    alert("Only admins can share files."); // Alert if the user is not an admin
  }
};

  return (
    <Container>
      {/* File upload button */}
      <label htmlFor="contained-button-file">
        <Input
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<UploadFileIcon />}
          style={{ backgroundColor: theme.palette.primary.main }}
        >
          <Typography variant="h6">Choose File...</Typography>
        </Button>
      </label>
      {/* Display file selection error */}
      {fileError && <Typography color="error">{fileError}</Typography>}
      {/* Display selected file name */}
      {filename && (
        <Typography variant="subtitle1" style={{ marginTop: theme.spacing(2) }}>
          {filename}
        </Typography>
      )}
      {/* Upload button */}
      <Button
        variant="contained"
        color="primary"
        disabled={!file}
        onClick={handleUpload}
        style={{ marginTop: theme.spacing(2) }}
      >
        <Typography variant="h2">Upload</Typography>
      </Button>

      {/* Display loading state */}
      {isLoading && <Typography>Loading...</Typography>}

      {/* Display error messages */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Table to display files */}
      <TableContainer component={Paper} style={{ marginTop: theme.spacing(2) }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: "1px solid black" }}>
                File Name
              </TableCell>
              <TableCell align="right" style={{ border: "1px solid black" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell
                  component="td"
                  scope="row"
                  style={{
                    width: "40%",
                    maxWidth: "200px",
                    border: "1px solid black",
                  }}
                >
                  {file.document_name}
                </TableCell>
                <TableCell align="right" style={{ border: "1px solid black" }}>
                  {/* Action buttons for each file */}
                  <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewFile(file.id)}
                    color="primary"
                    variant="contained"
                    size="small"
                  >
                    View
                  </Button>
                  {is_admin && (
                    <>
                      <Button
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownload(file.id, file.document_name)}
                        color="secondary"
                        variant="contained"
                        size="small"
                      >
                        Download
                      </Button>
                      <Button
                        startIcon={<ShareIcon />}
                        onClick={() => handleShare(file.id)}
                        color="tertiary"
                        variant="contained"
                        size="small"
                      >
                        Share
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteFile(file.id)}
                        color="primary"
                        variant="contained"
                        size="small"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for viewing a file */}
      <Modal
        open={viewingFile !== null}
        onClose={handleCloseViewer}
        aria-labelledby="document-viewer"
        aria-describedby="view-document"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            onClick={handleCloseViewer}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" mb={2}>
            {viewingFile?.document_name}
          </Typography>
          {currentFileUrl ? (
            <iframe
              src={currentFileUrl}
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                border: "none",
              }}
              title="Document Viewer"
            />
          ) : (
            <Typography>Loading document...</Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default CareVault;