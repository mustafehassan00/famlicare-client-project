import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LovedOne_name from "./LovedOne_Name.jsx";
import LovedOne_details from "./LovedOne_Details.jsx";
import LovedOne_address from "./LovedOne_Address.jsx";
import LovedOne_review from "./LovedOne_Review.jsx";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CREATE_LOVED_ONE_REQUEST,
  STORE_LOVED_ONE_NAME_INFO_REQUEST,
  STORE_LOVED_ONE_DETAIL_INFO_REQUEST,
  STORE_LOVED_ONE_ADDRESS_INFO_REQUEST,
} from "../../redux/reducers/actions/lovedOne.actions.js";

// Component for creating a new "Loved One" record
// Utilizes Redux for state management and Material UI for styling
const CreateLovedOne = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(1); // Controls the step in the form process
  const loading = useSelector((state) => state.lovedOne?.loading); // Loading state for async actions
  const error = useSelector((state) => state.lovedOne?.error); // Error state for handling API errors
  const theme = useTheme(); // Access to Material UI theme for consistent styling
  const lovedOne = useSelector((store) => store.lovedOneReducer); // Access to the current loved one state
  const create_success = useSelector(
    (state) => state.lovedOne?.createdSuccessfully
  ); // Flag to check if creation was successful
  const [openDialogCheck, setOpenDialogCheck] = useState(); // Controls visibility of the success dialog

  // Effect hook for handling errors and success state
  useEffect(() => {
    if (error) {
      console.error("An error occurred:", error); // Log errors for troubleshooting
    }
    if (!!(create_success)) {
      setOpenDialogCheck(true); // Open success dialog if creation was successful
    }
  }, [error, create_success, lovedOne?.id]);

  // Closes the success dialog and navigates to the care team form
  const handleClose = () => {
    setOpenDialogCheck(false);
    history.push("/careteamform"); // Ensure the route is correct and exists in your routing setup
  };

  // Handles the transition to the next step in the form
  // Dispatches actions to store form data in Redux state
  const handleNextStep = (data) => {
    switch (step) {
      case 1:
        dispatch({ type: STORE_LOVED_ONE_NAME_INFO_REQUEST, payload: data });
        break;
      case 2:
        dispatch({ type: STORE_LOVED_ONE_DETAIL_INFO_REQUEST, payload: data });
        break;
      case 3:
        dispatch({ type: STORE_LOVED_ONE_ADDRESS_INFO_REQUEST, payload: data });
        break;
      case 4:
        dispatch({ type: CREATE_LOVED_ONE_REQUEST, payload: data }); // Final step triggers the creation action
        break;
      default:
        console.error("Invalid step"); // Helps in identifying issues with step logic
    }
    if (step < 4) {
      setStep((prevStep) => prevStep + 1); // Safely increments the step
    }
  };

  // Handles moving back to the previous step in the form
  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1); // Ensure step does not go below 1
    }
  };

  // Renders the current step component based on the step state
  const renderStep = () => {
    switch (step) {
      case 1:
        return <LovedOne_name onSubmit={handleNextStep} />;
      case 2:
        return (
          <LovedOne_details
            onSubmit={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        );
      case 3:
        return (
          <LovedOne_address
            onSubmit={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        );
      case 4:
        return (
          <LovedOne_review
            onSubmit={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        );
      default:
        return null; // Helps in debugging if an invalid step is set
    }
  };

  return (
    <div>
      <Typography variant="h1" align="center">
        Add your loved one
      </Typography>
      <Typography variant="h3" component="h2" align="center" mb={4}>
        Step {step} of 4
      </Typography>
      <Box
        sx={{
          mx: "auto",
          width: "80%",
          padding: 2.5,
          border: 2,
          borderColor: theme.palette.primary.main,
        }}
      >
        {loading && <p>Loading...</p>} {/* Display loading state to the user */}
        {error && <p>Error: {error}</p>}{" "}
        {/* Display error messages to the user */}
        {renderStep()}
        <Dialog
          open={!!(openDialogCheck)}
          onClose={handleClose}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">
            Loved One Added Successfully!
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-description">
              {"Your loved one has been added successfully!"}
            </DialogContentText>
          </DialogContent>
          <Button
            variant="contained"
            className="pop-up on"
            onClick={handleClose}
          >
            OK
          </Button>
        </Dialog>
      </Box>
    </div>
  );
};

// export default CreateLovedOne;
