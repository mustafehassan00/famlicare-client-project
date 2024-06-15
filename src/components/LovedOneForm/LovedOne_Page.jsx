//imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LovedOne_Name from "./LovedOne_Name.jsx";
import LovedOne_Details from "./LovedOne_Details.jsx";
import LovedOne_Address from "./LovedOne_Address.jsx";
import LovedOne_Review from "./LovedOne_Review.jsx";
import { Typography } from "@mui/material";
import { createLovedOne, updateLovedOne, updateUserTableWithLovedOneId } from './lovedOneActions'; // Import your action creators

const CreateLovedOne = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [lovedOneData, setLovedOneData] = useState({});
  // Accessing the Redux store for lovedOneId, loading, and error states
  const lovedOneId = useSelector(state => state.lovedOne.id);
  const loading = useSelector(state => state.lovedOne.loading);
  const error = useSelector(state => state.lovedOne.error);

  // Effect hook to listen for error changes and handle them appropriately
  useEffect(() => {
    if (error) {
      // Log the error or display a notification to the user
      console.error("An error occurred:", error);
    }
  }, [error]);

  const handleNextStep = (data) => {
    const newData = { ...lovedOneData, ...data };
    setLovedOneData(newData);

    // Handling the first step specifically
    if (step === 1) {
      dispatch(createLovedOne(newData))
        .then(() => {
          // Proceed to the next step only if there's no error
          if (!error) {
            setStep((prevStep) => prevStep + 1);
          }
        })
        .catch((err) => {
          // Error handling could be more specific based on the error
          console.error("Failed to create loved one:", err);
        });
    } else if (step === 2 || step === 3) {
      dispatch(updateLovedOne({ id: lovedOneId, ...newData }))
        .then(() => {
          // Automatically proceed to the next step if there's no error
          if (!error) {
            setStep((prevStep) => prevStep + 1);
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
    dispatch(updateUserTableWithLovedOneId({ lovedOneId }))
      .then(() => {
        // Handle success, such as navigating to a new page or showing a success message
      })
      .catch((err) => {
        // Handle submission error
        console.error("Failed to update user table with loved one ID:", err);
      });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <LovedOne_Name onSubmit={handleNextStep} />;
      case 2:
        return <LovedOne_Details onSubmit={handleNextStep} />;
      case 3:
        return <LovedOne_Address onSubmit={handleNextStep} />;
      case 4:
        return (
          <LovedOne_Review
            lovedOneData={lovedOneData}
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
      <Typography variant="h1">Add your loved one</Typography>
      <Typography variant="h3">Step {step} of 4</Typography>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {renderStep()}
    </div>
  );
};

export default CreateLovedOne;