import React, { useState } from "react";
import LovedOne_Name from "./LovedOne_Name.jsx";
import LovedOneDetailsForm from "./LovedOneDetailsForm";
import LovedOneAddressForm from "./LovedOneAddressForm";
import LovedOneReviewForm from "./LovedOneReviewForm";
import { Typography } from "@mui/material";

const CreateLovedOne = () => {
  const [step, setStep] = useState(1);
  const [lovedOneData, setLovedOneData] = useState({});

  const handleNextStep = (data) => {
    setLovedOneData((prevData) => ({ ...prevData, ...data }));
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
        return <LovedOneDetailsForm onSubmit={handleNextStep} />;
      case 3:
        return <LovedOneAddressForm onSubmit={handleNextStep} />;
      case 4:
        return (
          <LovedOneReviewForm
            lovedOneData={lovedOneData}
            onSubmit={handleSubmit}
            onPrevStep={handlePrevStep}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Dispatch the final createLovedOne or updateLovedOne action with the collected data
    // Handle any additional logic, such as navigating to the next screen or creating the CareTeam
  };

  return;
  <div>
    <Typography variant="h1">Add your loved one</Typography>
    <Typography variant="h3">Step {step} of 4</Typography>
    {renderStep()}
  </div>;
};

export default CreateLovedOne;
