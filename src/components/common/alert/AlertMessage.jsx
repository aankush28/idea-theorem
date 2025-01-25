import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { Colors } from "../../../styles/theme";
import { alertStyles } from "../../../styles/AlertStyles";

const AlertMessage = ({ error, success, isMobile, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error || success) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 2500);

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [error, success, onClose]);

  if (!showAlert) return null; // Prevent rendering when no alert is needed

  return (
    <Alert
      icon={
        error ? (
          <RxCrossCircled style={{ color: Colors.grey }} />
        ) : (success ? <IoCheckmarkCircleOutline style={{ color: Colors.grey }} /> : null)
      }
      sx={alertStyles(isMobile, error)}
    >
      {error || success}
    </Alert>
  );
};

export default AlertMessage;
