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

const Input = styled("input")(({ theme }) => ({
  display: "none",
}));

function CareVault() {
  // State management for file operations
  const [file, setFile] = useState(null); // Holds the currently selected file
  const [filename, setFilename] = useState(""); // Holds the name of the selected file
  const [fileError, setFileError] = useState(""); // Holds error message for file selection
  const [fileUrl, setFileUrl] = useState(""); // URL for viewing the file
  const [viewingFile, setViewingFile] = useState(null); // Holds the file object that is being viewed

  // Redux hooks for dispatching actions and selecting state
  const dispatch = useDispatch();
  const files = useSelector((state) => state.careVault.files); // Selects files from the Redux store
  const theme = useTheme(); // Accesses the theme for styling components
  const is_admin = useSelector((state) => state.user.is_admin); // Determines if the user is an admin

  // File selection handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if the file type is audio or video
      if (
        selectedFile.type.startsWith("audio/") ||
        selectedFile.type.startsWith("video/")
      ) {
        // Set error message for audio and video files
        setFileError("Audio and video files are not allowed.");
        setFile(null);
        setFilename("");
      } else {
        // Clear error and proceed for other file types
        setFile(selectedFile);
        setFilename(selectedFile.name);
        setFileError(""); // Clear any previous error message
      }
    }
  };

  // File upload handler
  const handleUpload = () => {
    if (file) {
      // Dispatches an action to upload the file, example payload structure
      dispatch({ type: "UPLOAD_FILES", payload: { file, lovedOneId: 1 } });
      // Reset file selection state after upload
      setFile(null);
      setFilename("");
      setFileError(""); // Clear error message after successful upload
    }
  };

  // File viewing handler
  const handleViewFile = async (fileId) => {
    try {
      const response = await axios.get(`/api/care-vault/view/${fileId}`);
      setFileUrl(response.data.url); // Sets the URL for the iframe to display the file
      setViewingFile(files.find((f) => f.id === fileId)); // Finds and sets the file being viewed
    } catch (error) {
      console.error("Error fetching file URL:", error); // Logs error for troubleshooting
    }
  };

  // Viewer close handler
  const handleCloseViewer = () => {
    setViewingFile(null); // Resets the viewing file state
    setFileUrl(""); // Clears the file URL
  };

  // File deletion handler
  const handleDeleteFile = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch({ type: "DELETE_FILES", payload: { id: fileId } }); // Dispatches delete action
    }
  };

  // DOWNLOAD FILES!!
  const handleDownload = (id, fileName) => {
    dispatch({ type: "DOWNLOAD_FILES", payload: { id, fileName } });
  };

  // Fetch files on component mount
  useEffect(() => {
    dispatch({ type: "FETCH_FILES" }); // Dispatches action to fetch files
  }, [dispatch]); // Dependency array to avoid infinite loop

  return (
    <Container>
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
      {fileError && <Typography color="error">{fileError}</Typography>}
      {filename && (
        <Typography variant="subtitle1" style={{ marginTop: theme.spacing(2) }}>
          {filename}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        disabled={!file}
        onClick={handleUpload}
        style={{ marginTop: theme.spacing(2) }}
      >
        <Typography variant="h2">Upload</Typography>
      </Button>
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
                  <Button
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewFile(file.id)}
                    color="primary"
                    variant="contained"
                    size="small"
                  >
                    View
                  </Button>
                  <Button
                    startIcon={<DownloadIcon />}
                    color="secondary"
                    variant="contained"
                    size="small"
                  >
                    Download
                  </Button>
                  <Button
                    startIcon={<ShareIcon />}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
          {fileUrl ? (
            <iframe
              src={fileUrl}
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
