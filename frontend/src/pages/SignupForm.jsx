import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinstance.js";
import { showSuccess, showError } from "../utils/toast.js";
import { validateSignupForm } from "../utils/validation.js";
import { parseMongoError } from "../utils/errorParsing.js";
import { checkUsernameAvailability } from "../api.js";
import LoadingButton from "../components/LoadingButton.jsx";
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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [availability, setAvailability] = useState({
    username: null // null = not checked, true = available, false = taken
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    
    // Reset availability status when username changes
    if (name === 'username') {
      setAvailability(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validate form
    const validation = validateSignupForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      showError("Please fix the errors below");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post("/users/signup", formData);
      showSuccess(response.data.message || "Account created successfully!");
      
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
      
      // Navigate to the login page or home page
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      if (error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        const parsedError = parseMongoError(errorMessage);
        
        if (parsedError) {
          // Handle field-specific errors
          if (parsedError.field === 'username') {
            setErrors({ username: parsedError.message });
            showError(parsedError.message);
          } else {
            showError(parsedError.message);
          }
        } else {
          showError(errorMessage);
        }
      } else {
        showError("An error occurred. Please try again.");
      }
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced availability checking
  const checkAvailability = useCallback(async (field, value) => {
    if (!value || value.length < 3) return;
    
    try {
      let result;
      if (field === 'username') {
        result = await checkUsernameAvailability(value);
      } else {
        return; // Only check username availability
      }
      
      setAvailability(prev => ({
        ...prev,
        [field]: result.available
      }));
      
      if (!result.available) {
        setErrors(prev => ({
          ...prev,
          [field]: result.message
        }));
      }
    } catch (error) {
      console.error(`Error checking ${field} availability:`, error);
    }
  }, []);

  // Debounce effect for username checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.username && formData.username.length >= 3) {
        checkAvailability('username', formData.username);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.username, checkAvailability]);

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
      <div className="bg-gray-800 m-5 opacity-85 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create an account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white">Full name *</label>
            <input
              type="text"
              name="name"
              className={`w-full p-2 border bg-white rounded ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              required
              onChange={handleChange}
              value={formData.name}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-white">Username *</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                className={`w-full p-2 border bg-white rounded ${
                  errors.username 
                    ? 'border-red-500' 
                    : availability.username === true 
                    ? 'border-green-500' 
                    : availability.username === false 
                    ? 'border-red-500' 
                    : 'border-gray-600'
                }`}
                required
                onChange={handleChange}
                value={formData.username}
              />
              {availability.username === true && (
                <div className="absolute right-3 top-2 text-green-500">
                  ✓
                </div>
              )}
              {availability.username === false && (
                <div className="absolute right-3 top-2 text-red-500">
                  ✗
                </div>
              )}
            </div>
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
            {availability.username === true && (
              <p className="text-green-400 text-sm mt-1">Username is available!</p>
            )}
          </div>

          <div>
            <label className="block text-white">Email *</label>
            <input
              type="email"
              name="email"
              className={`w-full p-2 border bg-white rounded ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              required
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-white">Country *</label>
              <select
                name="country"
                className={`w-full p-2 border bg-white rounded ${
                  errors.country ? 'border-red-500' : 'border-gray-600'
                }`}
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
              {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
            </div>

            <div className="w-1/2">
              <label className="block text-white">Specialization *</label>
              <select
                name="sector"
                className={`w-full p-2 border bg-white rounded ${
                  errors.sector ? 'border-red-500' : 'border-gray-600'
                }`}
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
              {errors.sector && <p className="text-red-400 text-sm mt-1">{errors.sector}</p>}
            </div>
          </div>

          <div>
            <label className="block text-white">Organization type *</label>
            <select
              name="organization"
              className={`w-full p-2 border bg-white rounded ${
                errors.organization ? 'border-red-500' : 'border-gray-600'
              }`}
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
            {errors.organization && <p className="text-red-400 text-sm mt-1">{errors.organization}</p>}
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
              <span className="text-red-400"> *</span>
            </label>
          </div>
          {errors.policies && <p className="text-red-400 text-sm mt-1">{errors.policies}</p>}

          <div>
            <label className="block text-white">Password *</label>
            <input
              type="password"
              name="password"
              className={`w-full p-2 bg-white border rounded ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              }`}
              required
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-white">Password confirmation *</label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full p-2 bg-white border rounded ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
              }`}
              required
              onChange={handleChange}
              value={formData.confirmPassword}
            />
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Creating Account..."
            className="w-full"
          >
            Create Account
          </LoadingButton>
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
