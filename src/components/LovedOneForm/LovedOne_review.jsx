import React from "react";
import { useSelector } from "react-redux";
import { Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function LovedOne_Review({ onSubmit, onPrevStep }) {
  const theme = useTheme();
  const lovedOne = useSelector((state) => state.lovedOne);

  console.log(lovedOne);

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      <Typography variant="h5" gutterBottom>
        {lovedOne.first_name}'s Information
      </Typography>
      <Typography>
        <strong>Name:</strong> {lovedOne.first_name} {lovedOne.last_name}
      </Typography>
      <Typography>
        <strong>Age:</strong> {lovedOne.age}
      </Typography>
      <Typography>
        <strong>Main Medical Conditions:</strong> {lovedOne.main_condition}
      </Typography>
      <Typography>
        <strong>Address:</strong>
      </Typography>
      <Box sx={{ marginLeft: theme.spacing(2) }}>
        <Typography>{lovedOne.street_address}</Typography>
        {lovedOne.street_address2 && (
          <Typography>{lovedOne.street_address2}</Typography>
        )}
        <Typography>{`${lovedOne.city}, ${lovedOne.state_province} ${lovedOne.postal_code}`}</Typography>
        <Typography>{lovedOne.country}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: theme.spacing(2),
        }}
      >
        <Button variant="text" onClick={onPrevStep}>
          Previous Step
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Confirm Submission
        </Button>
      </Box>
    </Box>
  );
}
