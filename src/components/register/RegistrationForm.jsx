import React, { useState } from "react";
import { Box, Typography, Grid, useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import { createUserAPI } from "../../utils/api";
import { days, FormField, months, SelectField, years } from "../../utils/formField";
import { Colors } from "../../styles/theme";
import { validateForm } from "../../utils/validation";
import { getHelperText } from "../../utils/getHelperText";
import { useFormStyles } from "../../styles/RegistrationFormStyles";  // Import the styles
import AlertMessage from "../common/alert/AlertMessage";
import { ActionButton } from "../common/button/ActionButton";

const theme = createTheme(); 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    day: "",
    month: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    contactNumber: false,
    email: false,
    day: false,
    month: false,
    year: false,
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { formHeader, formBody, typographyFontStyle } = useFormStyles();  // Use the custom styles

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === "contactNumber" ? value.replace(/[a-zA-Z]/g, "") : value;
    setFormData({ ...formData, [name]: numericValue });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate form data
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await createUserAPI(formData);

      if (response.status === 200) {
        setSuccess("User account successfully created.");
        setFormData({
          fullName: "",
          contactNumber: "",
          email: "",
          day: "",
          month: "",
          year: "",
          password: "",
          confirmPassword: "",
        });
        setTouched({
          fullName: false,
          contactNumber: false,
          email: false,
          day: false,
          month: false,
          year: false,
          password: false,
          confirmPassword: false,
        });
      } else {
        setError("There was an error creating the account.");
      }
    } catch (err) {
      setError("There was an error creating the account.");
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      contactNumber: "",
      email: "",
      day: "",
      month: "",
      year: "",
      password: "",
      confirmPassword: "",
    });
    setTouched({
      fullName: false,
      contactNumber: false,
      email: false,
      day: false,
      month: false,
      year: false,
      password: false,
      confirmPassword: false,
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={formHeader}>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, fontSize: "20px", fontWeight: 700 }}>
        Create User Account
      </Typography>

      <AlertMessage
        error={error}
        success={success}
        isMobile={isMobile}
        onClose={() => {
          setError(null);
          setSuccess(null);
        }}
      />
      <form onSubmit={handleSubmit}>
        <Box sx={formBody}>
          {/* Full Name */}
          <FormField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={touched.fullName && !formData.fullName}
            helperText={getHelperText("fullName", formData, touched)}
            required
          />

          {/* Contact Number */}
          <FormField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={touched.contactNumber && !formData.contactNumber}
            helperText={getHelperText("contactNumber", formData, touched)}
            required
          />

          {/* Date of Birth */}
          <Typography sx={typographyFontStyle}>Date of Birth</Typography>
          <Grid container spacing={2} paddingBottom="20px">
            <Grid item xs={4}><SelectField label="Day" name="day" value={formData.day} onChange={handleInputChange} onBlur={handleBlur} options={days} error={touched.day && !formData.day} helperText={getHelperText("day", formData, touched)} required /></Grid>
            <Grid item xs={4}><SelectField label="Month" name="month" value={formData.month} onChange={handleInputChange} onBlur={handleBlur} options={months} error={touched.month && !formData.month} helperText={getHelperText("month", formData, touched)} required /></Grid>
            <Grid item xs={4}><SelectField label="Year" name="year" value={formData.year} onChange={handleInputChange} onBlur={handleBlur} options={years} error={touched.year && !formData.year} helperText={getHelperText("year", formData, touched)} required /></Grid>
          </Grid>

          {/* Email */}
          <FormField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="email"
            error={touched.email && !formData.email}
            helperText={getHelperText("email", formData, touched)}
            required
          />

          {/* Password */}
          <FormField
            label="Create Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="password"
            error={touched.password && !formData.password}
            helperText={getHelperText("password", formData, touched)}
            required
          />

          {/* Confirm Password */}
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="password"
            error={touched.confirmPassword && !formData.confirmPassword}
            helperText={getHelperText("confirmPassword", formData, touched)}
            required
          />
        </Box>

        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent={isMobile ? "space-between" : "space-evenly"}
          marginTop={6}
        >
          <ActionButton
            label="Cancel"
            variant="outlined"
            onClick={handleCancel}
            isMobile={isMobile}
            backgroundColor="transparent"
            textColor={Colors.secondary}
            borderColor={Colors.secondary}
          />
          <ActionButton
            label="Submit"
            type="submit"
            isMobile={isMobile}
            backgroundColor={Colors.secondary}
            textColor={Colors.white}
          />
        </Box>
      </form>
    </Box>
    </ThemeProvider>
  );
};

export default RegistrationForm;
