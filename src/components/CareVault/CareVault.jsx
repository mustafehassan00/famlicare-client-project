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
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [fileError, setFileError] = useState(""); // Added state for file error message
  const [fileUrl, setFileUrl] = useState("");
  const [viewingFile, setViewingFile] = useState(null);

  const dispatch = useDispatch();
  const files = useSelector((state) => state.careVault.files);
  const theme = useTheme();
  const is_admin = useSelector((state) => state.user.is_admin);

  console.log("Is admin in component:", is_admin);

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

  const handleUpload = () => {
    if (file) {
      dispatch({ type: "UPLOAD_FILE", payload: { file, lovedOneId: 1 } });
      setFile(null);
      setFilename("");
      setFileError(""); // Clear error message after successful upload
    }
  };

  const handleViewFile = async (fileId) => {
    console.log("Viewing file with id:", fileId);
    try {
      const response = await axios.get(`/api/care-vault/view/${fileId}`);
      setFileUrl(response.data.url);
      setViewingFile(files.find((f) => f.id === fileId));
    } catch (error) {
      console.error("Error fetching file URL:", error);
    }
  };

  const handleCloseViewer = () => {
    setViewingFile(null);
    setFileUrl("");
  };

  const handleDeleteFile = (fileId) => {
    console.log("Deleting file with id:", fileId);
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch({ type: "DELETE_FILE", payload: { id: fileId } });
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_FILES" });
  }, [dispatch]);

  console.log("is admin:", is_admin);
  console.log("files being rendered:", files);

  return (
    <Container>
      <label htmlFor="contained-button-file">
        {/* Removed the accept attribute to allow all file types except audio/video which are filtered programmatically */}
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
      {/* Display an error message if an unsupported file type is selected */}
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
        <Typography variant="h6">Upload</Typography>
      </Button>
      <TableContainer component={Paper} style={{ marginTop: theme.spacing(2) }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell component="th" scope="row">
                  {file.document_name}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="view"
                    onClick={() => handleViewFile(file.id)}
                    color = "primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {is_admin && (
                    <>
                      {console.log("Rendering admin buttons")}
                      <IconButton aria-label="download" color="primary">
                        <DownloadIcon />
                      </IconButton>
                      <IconButton aria-label="share" color = "primary">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteFile(file.id)}
                        color="primary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
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
