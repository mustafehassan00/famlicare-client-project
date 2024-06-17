import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LovedOne_Name from "./LovedOne_Name.jsx";
import LovedOne_Details from "./LovedOne_Details.jsx";
import LovedOne_Address from "./LovedOne_Address.jsx";
import LovedOne_Review from "./LovedOne_Review.jsx";
import { Box, Typography, useTheme } from "@mui/material";

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
      dispatch(createLovedOneRequest(data))
        .then((response) => {
          if (!error) {
            setStep(2); // Move to the next step if there's no error
          }
        })
        .catch((err) => {
          console.error("Failed to create loved one:", err);
        });
    } else if (step === 2 || step === 3) {
      // If it's the second or third step, update the existing loved one
      dispatch(updateLovedOneRequest({ id: lovedOneId, ...data }))
        .then(() => {
          if (!error) {
            setStep((prevStep) => prevStep + 1); // Move to the next step if there's no error
          }
        })
        .catch((err) => {
          console.error("Failed to update loved one:", err);
        });
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    dispatch(updateUserTableWithLovedOneIdRequest({ lovedOneId }))
      .then(() => {
        // Handle success, such as navigating to a new page or showing a success message
      })
      .catch((err) => {
        console.error("Failed to update user table with loved one ID:", err);
      });
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
        return (
          <LovedOne_Review
            onSubmit={handleSubmit}
            onPrevStep={handlePrevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Typography variant="h1" align='center'>Add your loved one</Typography>
      <Typography variant="h3" component="h2" align='center' mb={4}>
        Step {step} of 4
      </Typography>
      <Box sx={{mx: 'auto', width:'80%', padding: 2.5, border: 2, borderColor: theme.palette.primary.main}}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {renderStep()}
      </Box>
    </div>
  );
};

export default CreateLovedOne;
