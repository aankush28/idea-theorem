export const validateForm = (formData) => {
  for (const field in formData) {
    switch (field) {
      case "fullName":
        if (!formData.fullName) {
          return "Full Name is required.";
        }
        if (/[^a-zA-Z\s]/.test(formData.fullName)) {
          return "Full Name cannot contain symbols and cannot be empty.";
        }
        break;

      case "contactNumber":
        if (!formData.contactNumber) {
          return "Contact Number is required.";
        }
        if (!/^\d{10}$/.test(formData.contactNumber)) {
          return "Contact Number must be in Canadian format (10 digits).";
        }
        break;

      case "email":
        if (!formData.email) {
          return "Email is required.";
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
          return "Invalid email address.";
        }
        break;

      case "day":
      case "month":
      case "year":
        if (!formData.day || !formData.month || !formData.year) {
          return "Date of Birth is required.";
        }
        const dob = new Date(`${formData.year}-${formData.month}-${formData.day}`);
        if (dob > new Date() || isNaN(dob.getTime())) {
          return "Date of Birth must be a valid past date.";
        }
        break;

      case "password":
        if (!formData.password) {
          return "Password is required.";
        }
        if (!/(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/.test(formData.password)) {
          return "Password must be at least 8 characters long and include a number and a special character.";
        }
        break;

      case "confirmPassword":
        if (formData.password !== formData.confirmPassword) {
          return "Passwords do not match.";
        }
        break;

      default:
        break;
    }
  }

  return null; // No errors
};
