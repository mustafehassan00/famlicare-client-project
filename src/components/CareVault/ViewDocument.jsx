import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function ViewDocument() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        const response = await axios.get(`/api/care-vault/view/${id}`);
        setFileUrl(response.data.url);
      } catch (error) {
        console.error('Error fetching file URL:', error);
      }
    };

    fetchFileUrl();
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Container>
      <IconButton onClick={handleClose} style={{ position: 'absolute', top: 10, right: 10 }}>
        <CloseIcon />
      </IconButton>
      <IconButton onClick={handleClose} style={{ position: 'absolute', top: 10, left: 10 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        Document Viewer
      </Typography>
      {fileUrl ? (
        <iframe
          src={fileUrl}
          style={{ width: '100%', height: 'calc(100vh - 100px)', border: 'none' }}
          title="Document Viewer"
        />
      ) : (
        <Typography>Loading document...</Typography>
      )}
    </Container>
  );
}

export default ViewDocument;