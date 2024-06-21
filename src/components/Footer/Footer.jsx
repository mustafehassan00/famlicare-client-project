import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function Footer() {
  const theme = useTheme(); 
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="body2">
        &copy; Famlicare 2024
      </Typography>
    </Box>
  );
}

export default Footer;