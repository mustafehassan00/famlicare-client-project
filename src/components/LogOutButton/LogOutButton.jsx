import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography, useTheme } from '@mui/material'

function LogOutButton(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      variant = 'contained'
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}

    >
      <Typography variant='h2'>Log Out</Typography>
    </Button>
  );
}

export default LogOutButton;
