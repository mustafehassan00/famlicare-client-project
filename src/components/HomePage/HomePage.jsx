import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Typography,
  useTheme,
  Link,
} from "@mui/material";

function Homepage() {
  const theme = useTheme();

  const tileButtonStyle = {
    height: "100px",
    borderRadius: theme.shape.borderRadius,
    fontWeight: "bold",
    fontSize: "1.2rem",
    textTransform: "none",
  };

  const organicButtonStyle = {
    height: "100px",
    borderRadius: "50% 20% / 10% 40%",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textTransform: "none",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-10px",
      left: "-10px",
      right: "-10px",
      bottom: "-10px",
      background: "inherit",
      filter: "blur(5px)",
      zIndex: -1,
    },
  };

  const disabledButtonStyle = {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.disabled,
    border: `2px solid ${theme.palette.grey[400]}`,
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: theme.spacing(4) }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: theme.spacing(3),
          color: theme.palette.primary.main,
        }}
      >
        Welcome to FamliCare
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Button
            component={RouterLink}
            to="/user"
            variant="contained"
            fullWidth
            sx={{
              ...tileButtonStyle,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            User Profile
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            component={RouterLink}
            to="/messages"
            variant="contained"
            fullWidth
            sx={{
              ...tileButtonStyle,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            Messages
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
            component = {RouterLink}
            to="/createorjointeam"
            variant="contained"
            fullWidth
            sx={{
              ...tileButtonStyle,
              backgroundColor: theme.palette.secondary.main,
            }}>
              Join a Care Team
            </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            component={RouterLink}
            to="/careteam"
            variant="contained"
            fullWidth
            sx={tileButtonStyle}
          >
            CareTeam
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            component={RouterLink}
            to="/carevault"
            variant="contained"
            fullWidth
            sx={{
              ...tileButtonStyle,
              backgroundColor: theme.palette.tertiary.main,
            }}
          >
            CareVault
          </Button>
        </Grid>

        {/* Disabled buttons don't need navigation */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            disabled
            sx={{ ...tileButtonStyle, ...disabledButtonStyle }}
          >
            CareCalendar (Coming Soon)
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            disabled
            sx={{ ...tileButtonStyle, ...disabledButtonStyle }}
          >
            CareFeed (Not Available)
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            disabled
            sx={{ ...tileButtonStyle, ...disabledButtonStyle }}
          >
            CareMap (Not Available)
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
