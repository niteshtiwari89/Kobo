// MongoDB error parsing utilities

export const parseMongoError = (error) => {
  if (!error || typeof error !== 'string') return null;
  
  // Check for duplicate key errors (E11000)
  if (error.includes('E11000') || error.includes('duplicate key')) {
    if (error.includes('username')) {
      return {
        field: 'username',
        message: 'This username is already taken. Please choose a different username.'
      };
    }
    
    return {
      field: 'general',
      message: 'This information is already in use. Please try different details.'
    };
  }
  
  // Check for validation errors
  if (error.includes('validation failed') || error.includes('ValidationError')) {
    if (error.includes('email')) {
      return {
        field: 'email',
        message: 'Please enter a valid email address.'
      };
    }
    
    if (error.includes('password')) {
      return {
        field: 'password',
        message: 'Password does not meet requirements.'
      };
    }
    
    if (error.includes('username')) {
      return {
        field: 'username',
        message: 'Username is invalid or does not meet requirements.'
      };
    }
  }
  
  return null;
};

export const getErrorMessage = (error) => {
  const parsed = parseMongoError(error);
  return parsed ? parsed.message : error;
};

export const getErrorField = (error) => {
  const parsed = parseMongoError(error);
  return parsed ? parsed.field : null;
};

export default {
  parseMongoError,
  getErrorMessage,
  getErrorField,
};
