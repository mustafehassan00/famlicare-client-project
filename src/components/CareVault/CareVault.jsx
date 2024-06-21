import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// MUI components for UI design
import { Button, Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
// Icons for delete and upload actions
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
// Utility for styling components
import { styled } from '@mui/material/styles';

// Styled component for hiding the file input element
const Input = styled('input')({
  display: 'none',
});

function CareVault() {
  // State for managing the selected file
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  // Fetching files from the Redux store
  const files = useSelector((state) => state.careVault.files);

  // Function to dispatch the upload action
  const upload = () => {
    // Dispatching with a static lovedOneId for now, consider making this dynamic based on user selection
    dispatch({ type: "UPLOAD_FILE", payload: { file, lovedOneId: 1 } });
  };

  // Function to dispatch the delete action
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_FILE", payload: { id } });
  };

  // Fetch files on component mount
  useEffect(() => {
    dispatch({ type: "FETCH_FILES" });
  }, [dispatch]);

  return (
    <Container>
      {/* File input hidden but accessible via label */}
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
          <Typography variant='h2'>Choose a file ...</Typography>
        </Button>
      </label>
      {/* Button to trigger file upload */}
      <Button variant="contained" className="primary off" onClick={upload} style={{ marginLeft: '10px' }}>
        <Typography variant="h2" >Upload File</Typography>
      </Button>

      {/* List of files fetched from the store */}
      <List>
        {files.map((file) => (
          <ListItem key={file.id} divider>
            {/* Link to the file, ensure the URL is secure and valid */}
            <ListItemText primary={<a href={file.attachment_URL} target="_blank" rel="noopener noreferrer">{file.document_name}</a>} />
            {/* Delete action for each file */}
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(file.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default CareVault;