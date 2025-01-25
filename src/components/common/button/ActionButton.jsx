import React from "react";
import { Button } from "@mui/material";
import { actionButtonStyles } from "../../../styles/ActionButtonStyles";

export function ActionButton({
  label,
  variant = "contained",
  onClick,
  isMobile,
  backgroundColor,
  borderColor,
  textColor,
  type
}) {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      fullWidth={isMobile}
      sx={actionButtonStyles(isMobile, variant, backgroundColor, borderColor, textColor)}
    >
      {label}
    </Button>
  );
}
