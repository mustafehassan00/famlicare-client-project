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
    if (step === 1) {
      // If it's the first step, create a new loved one
      dispatch({ type: CREATE_LOVED_ONE_REQUEST, payload: data });
    } else if (step === 2 || step === 3) {
      // For steps 2 and 3, update the loved one
      dispatch({
        type: UPDATE_LOVED_ONE_REQUEST,
        payload: { data, loved_one_id: lovedOneId },
      });
    }
    // Increment step counter
    setStep((prevStep) => prevStep + 1);
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
            lovedOneId={lovedOneId}
            onSubmit={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        );
      case 3:
        return (
          <LovedOne_Address
            lovedOneId={lovedOneId}
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
