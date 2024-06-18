import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

// This component handles the address form for a loved one.
// It collects street address, optional address line 2, city, state/province, country, and postal code.
function LovedOne_Address({ onSubmit }) {
  // State hooks for each input field in the form.
  const [street_address, setStreetAddress] = useState("");
  const [street_address2, setStreetAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state_province, setStateProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");

  // Handles form submission.
  // Prevents the default form submit action and calls the onSubmit prop with form data.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ street_address, street_address2, city, state_province, country, postal_code });
  };

  return (
    <Container>
      <Typography variant="h2" component="h3">What is their address?</Typography>
      <form onSubmit={handleSubmit}>
        {/* TextField components for each part of the address.
            Each field updates its corresponding state on change. */}
        <TextField
          label="Street Address"
          variant="outlined"
          value={street_address}
          onChange={(e) => setStreetAddress(e.target.value)} 
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apt, Building, Suite, etc." // Optional field for additional address details.
          variant="outlined"
          value={street_address2}
          onChange={(e) => setStreetAddress2(e.target.value)} 
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="State/Province"
          variant="outlined"
          value={state_province}
          onChange={(e) => setStateProvince(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Country"
          variant="outlined"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="ZIP/Postal Code"
          variant="outlined"
          value={postal_code}
          onChange={(e) => setPostalCode(e.target.value)}
          fullWidth
          margin="normal"
        />
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
          {/* Conditional rendering for the Next button */}
          {street_address && city && state_province && country && postal_code ? (
            <Button variant="contained" className="primary on" type="submit">
              Next
            </Button>
          ) : (
            <Button variant="contained" className="primary off" disabled>
              Next
            </Button>
          )}
        </Box>
      </form>
    </Container>
  );
}

export default LovedOne_Address;