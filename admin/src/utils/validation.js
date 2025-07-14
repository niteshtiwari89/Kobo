// Validation utility functions for admin panel

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Username validation
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
};

// Form name validation
export const validateFormName = (name) => {
  return name && name.trim().length >= 2;
};

// Template name validation
export const validateTemplateName = (name) => {
  return name && name.trim().length >= 2;
};

// URL validation
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Required field validation
export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim().length > 0;
};

// Login form validation
export const validateLoginForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.email)) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  if (!validateRequired(formData.password)) {
    errors.password = "Password is required";
  } else if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters long";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Form creation validation
export const validateFormCreation = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.title)) {
    errors.title = "Form title is required";
  } else if (!validateFormName(formData.title)) {
    errors.title = "Form title must be at least 2 characters long";
  }
  
  if (!validateRequired(formData.description)) {
    errors.description = "Form description is required";
  }
  
  if (!formData.questions || formData.questions.length === 0) {
    errors.questions = "At least one question is required";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Template creation validation
export const validateTemplateCreation = (templateData) => {
  const errors = {};
  
  if (!validateRequired(templateData.name)) {
    errors.name = "Template name is required";
  } else if (!validateTemplateName(templateData.name)) {
    errors.name = "Template name must be at least 2 characters long";
  }
  
  if (!validateRequired(templateData.description)) {
    errors.description = "Template description is required";
  }
  
  if (!templateData.questions || templateData.questions.length === 0) {
    errors.questions = "At least one question is required";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
