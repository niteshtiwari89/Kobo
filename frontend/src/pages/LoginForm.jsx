import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { showError } from "../utils/toast.js";
import { validateLoginForm } from "../utils/validation.js";
import { frontLogin } from "../api.js"; // Import the frontLogin function
import LoadingButton from "../components/LoadingButton.jsx";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validate form
    const validation = validateLoginForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      showError("Please fix the errors below");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await frontLogin(formData);
      localStorage.setItem("token", response.token);
      navigate("/home/deployed");
    } catch (error) {
      // Error handling is already done in the API function
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState); // Toggle the password visibility state
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://kf.kobotoolbox.org/static/compiled/signup_photo.jpg)",
      }}
    >
      <div className="bg-[#FED600] opacity-100 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <img src={"logo1.png"} alt="Relearn Logo" className="h-10  mx-auto" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border bg-white text-black rounded ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="relative">
            <label className="block text-black">Password</label>
            <input
              type={passwordVisible ? "text" : "password"} // Toggle password type
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border bg-white text-black rounded pr-12 ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              }`} // Add padding to the right for the button
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2  transform translate-y-1 text-gray-400"
            >
              {passwordVisible ? (
                <EyeClosed className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Logging in..."
            className="w-full text-white"
          >
            <p className="text-white">Login</p>
          </LoadingButton>
        </form>
        <div className="mt-4 flex justify-around text-center text-black">
          <Link to="/signup" className="text-black">
            {" "}
            Create an account
          </Link>
          <Link href="#" className="text-black">
            {" "}
            Forgot password?
          </Link>
        </div>
        <hr className="border-white mt-2" />
        <div className="mt-4 text-center text-white space-x-2">
          <Link to="/terms" className="text-black">
            {" "}
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-black">
            {" "}
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
