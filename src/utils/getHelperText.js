import { styles } from "../styles/theme";

const formatName = (name) => {
  return name
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .trim() // Remove leading or trailing spaces
    .toLowerCase() // Convert entire string to lowercase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
};

export const getHelperText = (field, formData, touched) => {
  if (!formData[field] && touched[field]) {
    return (
      <span style={styles.inputValidationRequired}>
        {formatName(field)} is required
      </span>
    );
  }
  if (
    field === "fullName" &&
    formData.fullName &&
    /[^a-zA-Z\s]/.test(formData.fullName)
  ) {
    return (
      <span style={styles.inputValidationerror}>
        Full Name cannot contain symbols and cannot be empty.
      </span>
    );
  }
  // Email validation
  if (
    field === "email" &&
    formData.email &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
  ) {
    return (
      <span style={styles.inputValidationerror}>
        Sorry, this email address is not valid. Please try again.
      </span>
    );
  }

  // Contact Number validation (only digits, must be 10 digits long)
  if (
    field === "contactNumber" &&
    formData.contactNumber &&
    !/^\d{10}$/.test(formData.contactNumber)
  ) {
    return (
      <span style={styles.inputValidationerror}>
        Contact number must be 10 digits long and contain only numbers.
      </span>
    );
  }

  // Password validation (at least 8 characters, including a number and special character)
  if (
    field === "password" &&
    formData.password &&
    !/(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/.test(formData.password)
  ) {
    return (
      <span style={styles.inputValidationerror}>
        Password must be at least 8 characters long, including a number and a
        special character.
      </span>
    );
  }

  // Confirm Password validation (must match password)
  if (
    field === "confirmPassword" &&
    formData.confirmPassword &&
    formData.confirmPassword !== formData.password
  ) {
    return (
      <span style={styles.inputValidationerror}>
        Confirm password must match the password.
      </span>
    );
  }

  return "";
};
