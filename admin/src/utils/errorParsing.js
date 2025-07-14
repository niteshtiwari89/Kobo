// Error parsing utilities for admin panel

// Parse MongoDB duplicate key errors
export const parseMongoError = (errorMessage) => {
  if (!errorMessage || typeof errorMessage !== 'string') {
    return null;
  }

  // Handle MongoDB duplicate key error (E11000)
  const duplicateKeyRegex = /E11000 duplicate key error.*index: (\w+).*dup key: { "?(\w+)"?: "([^"]+)"/;
  const match = errorMessage.match(duplicateKeyRegex);
  
  if (match) {
    const field = match[2];
    const value = match[3];
    
    return {
      type: 'duplicate',
      field: field,
      value: value,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' is already taken`
    };
  }

  // Handle validation errors
  if (errorMessage.includes('ValidationError')) {
    const fieldMatch = errorMessage.match(/Path `(\w+)` is required/);
    if (fieldMatch) {
      return {
        type: 'validation',
        field: fieldMatch[1],
        message: `${fieldMatch[1]} is required`
      };
    }
  }

  return null;
};

// Parse network errors
export const parseNetworkError = (error) => {
  if (!error.response) {
    return {
      type: 'network',
      message: 'Network error. Please check your connection and try again.'
    };
  }

  const status = error.response.status;
  const data = error.response.data;

  switch (status) {
    case 400:
      return {
        type: 'validation',
        message: data.message || 'Invalid request. Please check your input.'
      };
    case 401:
      return {
        type: 'authentication',
        message: 'Authentication failed. Please login again.'
      };
    case 403:
      return {
        type: 'authorization',
        message: 'Access denied. You do not have permission to perform this action.'
      };
    case 404:
      return {
        type: 'not_found',
        message: 'Resource not found.'
      };
    case 409:
      return {
        type: 'conflict',
        message: data.message || 'Conflict detected. The resource already exists.'
      };
    case 422:
      return {
        type: 'validation',
        message: data.message || 'Validation failed. Please check your input.'
      };
    case 500:
      return {
        type: 'server',
        message: 'Server error. Please try again later.'
      };
    default:
      return {
        type: 'unknown',
        message: data.message || 'An unexpected error occurred.'
      };
  }
};

// Helper function to extract meaningful error message from various error formats
export const getErrorMessage = (error) => {
  // If error is already a string
  if (typeof error === 'string') {
    return error;
  }

  // If error has response data
  if (error.response?.data) {
    const data = error.response.data;
    
    // Check for common error message fields
    if (data.message) return data.message;
    if (data.error) return data.error;
    if (data.details) return data.details;
    
    // If data is a string
    if (typeof data === 'string') return data;
  }

  // If error has a message property
  if (error.message) {
    return error.message;
  }

  // Default fallback
  return 'An unexpected error occurred';
};
