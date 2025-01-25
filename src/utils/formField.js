import React from "react";
import { TextField, Typography, MenuItem } from "@mui/material";
import { Colors } from "../styles/theme";

// Constants
export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);

// Styles (you can adjust these as needed)
export const typographyFontStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "5px",
};

const textFieldStyle = {
  marginBottom: "34px",
};

// FormField Component
export const FormField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = "text",
  required = false,
}) => (
  <>
    <Typography sx={typographyFontStyle}>{label}</Typography>
    <TextField
      label={
        <span>
          {label} {required && <span style={{ color: "#DA1E28" }}>*</span>}
        </span>
      }
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      margin="dense"
      type={type}
      sx={textFieldStyle}
      error={error}
      helperText={helperText}
    />
  </>
);

// SelectField Component
export const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  helperText,
  required = false,
}) => (
  <>
    <TextField
      select
      name={name}
      label={
        <span>
          {label} {required && <span style={{ color: Colors.warning }}>*</span>}
        </span>
      }
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      sx={{ height: "50px", marginBottom: "15px" }}
      error={error}
      helperText={helperText}
      margin="dense"
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </>
);
