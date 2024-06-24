import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <LoginForm />

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;