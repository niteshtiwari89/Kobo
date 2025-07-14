// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const hardcodedEmail = "admin@example.com";
//     const hardcodedPassword = "password123";

//     if (
//       formData.email === hardcodedEmail &&
//       formData.password === hardcodedPassword
//     ) {
//       localStorage.setItem("token", "authenticated");
//       localStorage.setItem("tokenTime", new Date().toISOString());
//       navigate("/admin-panel");
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
//       <div className="bg-gray-800 opacity-85 p-8 rounded-lg shadow-lg w-full max-w-sm">
//         <div className="text-center mb-6">
//           <img src={null} alt="Relearn Logo" className="h-10 mx-auto" />
//         </div>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-white">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border bg-white border-gray-600 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-white">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border bg-white border-gray-600 rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed} from "lucide-react";
import axios from "axios";
import { showSuccess, showError } from "../utils/toast.js";
import { validateLoginForm } from "../utils/validation.js";
import LoadingButton from "./LoadingButton.jsx";

// const API_LOGIN = "https://relearn-backend.vercel.app"
const API_LOGIN = "http://localhost:5001"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    
    // Clear general error
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setError("");
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
      // Call the loginAdmin API
      const response = await axios.post(
        `${API_LOGIN}/api/users/loginadmin`,
        {
          username: formData.email, // Assuming email is used as the username
          password: formData.password,
        }
      );

      // Save the token to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tokenTime", new Date().toISOString());

      showSuccess("Login successful! Welcome to the admin panel.");

      // Redirect to the admin panel
      setTimeout(() => {
        navigate("/admin-panel/profile");
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Invalid email or password";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState); // Toggle the password visibility state
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
      <div className="bg-[#FED600] opacity-100 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <img src={"logo1.png"} alt="Relearn Logo" className="h-10 mx-auto" />
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
              className={`w-full p-2 bg-white text-black border rounded pr-12 ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              }`} // Add padding to the right for the button
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2   transform translate-y-1 text-gray-400"
            >
              {passwordVisible ? (
                <EyeClosed className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-200 py-2 rounded hover:bg-blue-600 text-white"
          >
           <p className="text-black"> {isLoading ? "Logging in..." : "Login"}</p>
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
