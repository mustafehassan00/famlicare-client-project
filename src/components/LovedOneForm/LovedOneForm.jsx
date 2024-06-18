import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LovedOne_Name from "./LovedOne_Name.jsx";
import LovedOne_Details from "./LovedOne_Details.jsx";
import LovedOne_Address from "./LovedOne_Address.jsx";
import LovedOne_Review from "./LovedOne_Review.jsx";
import { Box, Typography, useTheme } from "@mui/material";
import {
  CREATE_LOVED_ONE_REQUEST,
  UPDATE_LOVED_ONE_REQUEST,
} from "../../redux/reducers/actions/lovedOne.actions.js";

const CreateLovedOne = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const lovedOneId = useSelector((state) => state.lovedOne.id);
  const loading = useSelector((state) => state.lovedOne.loading);
  const error = useSelector((state) => state.lovedOne.error);
  const theme = useTheme();

  useEffect(() => {
    if (error) {
      console.error("An error occurred:", error);
    }
  }, [error]);

  const handleNextStep = (data) => {
  switch (step) {
    case 1:
      // Dispatch action to store name info in the reducer
      dispatch({ type: STORE_LOVED_ONE_NAME_INFO_REQUEST, payload: data });
      break;
    case 2:
      // Dispatch action to store details info in the reducer
      dispatch({ type: STORE_LOVED_ONE_DETAIL_INFO_REQUEST, payload: data });
      break;
    case 3:
      // Dispatch action to store address info in the reducer
      dispatch({ type: STORE_LOVED_ONE_ADDRESS_INFO_REQUEST, payload: data });
      break;
    case 4:
      // Only on the final step, create the loved one
      dispatch({ type: CREATE_LOVED_ONE_REQUEST, payload: data });
      break;
    default:
      console.error("Invalid step");
  }
  // Increment step counter if not the last step
  if (step < 4) {
    setStep((prevStep) => prevStep + 1);
  }
};

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <LovedOne_Name onSubmit={handleNextStep} />;
      case 2:
        return (
          <LovedOne_Details
            onSubmit={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        );
      case 3:
        return (
          <LovedOne_Address
            onSubmit={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        );
      case 4:
        return <LovedOne_Review onPrevStep={handlePrevStep} />;
      default:
        return null;
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
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {renderStep()}
      </Box>
    </div>
  );
};

export default CreateLovedOne;
