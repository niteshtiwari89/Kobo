import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../frontend-website/src/axiosinstance.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    country: "",
    sector: "",
    organization: "",
    updates: false,
    policies: false,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/signup", formData);
      // toast.success(response.data.message);
      // Clear the form fields
      setFormData({
        name: "",
        username: "",
        email: "",
        country: "",
        sector: "",
        organization: "",
        updates: false,
        policies: false,
        password: "",
        confirmPassword: "",
      });
      // Navigate to the Home page
      navigate("/home");
    } catch (error) {
      // if (
      //   error.response &&
      //   error.response.data &&
      //   error.response.data.message
      // ) {
      //   toast.error(error.response.data.message);
      // } else {
        console.log("An error occurred. Please try again.", error);
      //   toast.error("An error occurred. Please try again.");
      // }
    }
  };

  // Define options for country, sector, and organization
  const countryOptions = [
    "Nigeria",
    "India",
    "Ghana",
    "Kenya",
    "South Africa",
    "Togo",
    "Benin",
    "Cameroun",
    "Senegal",
    "Mali",
    "Niger",
    "Chad",
    "Ivory Coast",
    "Guinea",
    "Guinea Bissau",
    "Sierra Leone",
    "Liberia",
    "Gambia",
    "Cape Verde",
    "Sao Tome and Principe",
  ];
  const sectorOptions = [
    "Cardiologist",
    "Dentist",
    "Dermatologist",
    "Endocrinologist",
    "Gynecologist",
    "Neurologist",
    "Oncologist",
    "Ophthalmologist",
    "Orthopedist",
    "Pediatrician",
    "Psychiatrist",
    "Radiologist",
    "Urologist",
    "Others",
  ];
  const organizationOptions = ["Government", "Private", "NGO", "Others"];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://kf.kobotoolbox.org/static/compiled/signup_photo.jpg)",
      }}
      aria-label="Signup page background"
    >
      <ToastContainer />
      <div className="bg-gray-700 m-5 opacity-85 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <img src="/logo1.png" alt="Relearn Logo" className="h-10 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create an account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white">Full name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-600 bg-white rounded"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div>
            <label className="block text-white">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border border-gray-600 bg-white rounded"
              required
              onChange={handleChange}
              value={formData.username}
            />
          </div>

          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-600 bg-white rounded"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-white">Country</label>
              <select
                name="country"
                className="w-full p-2 border border-gray-600 bg-white rounded"
                required
                onChange={handleChange}
                value={formData.country}
              >
                <option value="">Select Country</option>
                {countryOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-white">Specialization</label>
              <select
                name="sector"
                className="w-full p-2 border border-gray-600 bg-white rounded"
                required
                onChange={handleChange}
                value={formData.sector}
              >
                <option value="">Select Specialization</option>
                {sectorOptions.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white">Organization type</label>
            <select
              name="organization"
              className="w-full p-2 border border-gray-600 bg-white rounded"
              required
              onChange={handleChange}
              value={formData.organization}
            >
              <option value="">Select Organization Type</option>
              {organizationOptions.map((organization) => (
                <option key={organization} value={organization}>
                  {organization}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="updates"
              className="h-4 w-4 text-blue-600"
              onChange={handleChange}
              checked={formData.updates}
            />
            <label className="text-white">
              I want to receive occasional updates about KoboToolbox
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="policies"
              className="h-4 w-4 text-blue-600"
              onChange={handleChange}
              checked={formData.policies}
            />
            <label className="text-white">
              I agree with the
              <Link to="/terms" className="text-blue-400">
                {" "}
                Terms of Service
              </Link>{" "}
              and
              <Link to="/privacy" className="text-blue-400">
                {" "}
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 bg-white border border-gray-600 rounded"
              required
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <div>
            <label className="block text-white">Password confirmation</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 bg-white border border-gray-600 rounded"
              required
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>
        <div className="mt-4 text-center text-white">
          <span>or </span>
          <Link to="/login" className="text-blue-400">
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
