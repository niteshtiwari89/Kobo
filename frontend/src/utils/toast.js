import { toast } from "react-toastify";

// Toast configuration options
const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Standardized toast functions
export const showSuccess = (message, options = {}) => {
  toast.success(message, { ...toastConfig, ...options });
};

export const showError = (message, options = {}) => {
  toast.error(message, { ...toastConfig, ...options });
};

export const showWarning = (message, options = {}) => {
  toast.warning(message, { ...toastConfig, ...options });
};

export const showInfo = (message, options = {}) => {
  toast.info(message, { ...toastConfig, ...options });
};

// Generic error handler for API responses
export const handleApiError = (error, fallbackMessage = "An error occurred") => {
  if (error.response?.data?.message) {
    showError(error.response.data.message);
  } else if (error.message) {
    showError(error.message);
  } else {
    showError(fallbackMessage);
  }
};

// Success handler for API responses
export const handleApiSuccess = (response, fallbackMessage = "Operation successful") => {
  const message = response?.data?.message || response?.message || fallbackMessage;
  showSuccess(message);
};

// Specific handler for duplicate key errors
export const showDuplicateError = (field) => {
  const messages = {
    username: "This username is already taken. Please choose a different username.",
    email: "This email is already registered. Please use a different email or try logging in.",
    general: "This information is already in use. Please try different details."
  };
  
  showError(messages[field] || messages.general);
};

export default {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  handleApiError,
  handleApiSuccess,
};
