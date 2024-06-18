import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddDeliveryAddressForm from "./AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";

const steps = [
  "Logovanje",
  "Adresa za dostavu",
  "Pregled porudžbine",
  "Plaćanje",
];

export default function Checkout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const step = parseInt(queryParams.get('step')) || 1;
  const navigate = useNavigate();

  // State za čuvanje orderId
  const [orderId, setOrderId] = React.useState(null);

  const handleNext = (id) => {
    setOrderId(id); // Postavi orderId u stanje komponente
    const nextStep = step + 1;
    navigate(`/checkout?step=${nextStep}`);
  };

  const handleBack = () => {
    const prevStep = step - 1;
    navigate(`/checkout?step=${prevStep}`);
  };

  const handleReset = () => {
    navigate(`/checkout?step=1`);
  };

  return (
    <Box className="px-5 lg:px-32 " sx={{ width: "100%" }}>
      <Stepper activeStep={step - 1}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {step === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={step === 1}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
          <div className="my-5">
            {step === 2 ? (
              <AddDeliveryAddressForm handleNext={handleNext} />
            ) : (
              <OrderSummary orderId={orderId} />
            )}
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}
