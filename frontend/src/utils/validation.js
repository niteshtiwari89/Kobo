// Form validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name);
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Comprehensive form validation
export const validateSignupForm = (formData) => {
  const errors = {};

  // Name validation
  if (!validateRequired(formData.name)) {
    errors.name = "Full name is required";
  } else if (!validateName(formData.name)) {
    errors.name = "Name should only contain letters and spaces (2-50 characters)";
  }

  // Username validation
  if (!validateRequired(formData.username)) {
    errors.username = "Username is required";
  } else if (!validateUsername(formData.username)) {
    errors.username = "Username should be 3-20 characters with letters, numbers, and underscores only";
  }

  // Email validation
  if (!validateRequired(formData.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Required fields
  if (!formData.country) errors.country = "Country is required";
  if (!formData.sector) errors.sector = "Specialization is required";
  if (!formData.organization) errors.organization = "Organization type is required";

  // Password validation
  if (!validateRequired(formData.password)) {
    errors.password = "Password is required";
  } else if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters long";
  }

  // Password confirmation
  if (!validateRequired(formData.confirmPassword)) {
    errors.confirmPassword = "Password confirmation is required";
  } else if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Terms agreement
  if (!formData.policies) {
    errors.policies = "Please agree to the Terms of Service and Privacy Policy";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLoginForm = (formData) => {
  const errors = {};

  // Email validation
  if (!validateRequired(formData.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!validateRequired(formData.password)) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  validateEmail,
  validatePassword,
  validateRequired,
  validateUsername,
  validateName,
  validatePasswordMatch,
  validateSignupForm,
  validateLoginForm,
};
