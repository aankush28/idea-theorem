import axios from "axios";

export async function createUserAPI(formData) {
  return await axios.post(
    "https://fullstack-test-navy.vercel.app/api/users/create",
    {
      full_name: formData.fullName,
      contact_number: formData.contactNumber,
      email: formData.email,
      date_of_birth: `${formData.day}-${formData.month}-${formData.year}`,
      password: formData.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
