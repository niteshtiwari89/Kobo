import axios from "axios";
// const USER_API_URL = "https://relearn-backend.vercel.app/api/users"; // Add the user API URL
const USER_API_URL = "http://localhost:5001/api/users"; // Add the user API URL
// const FORM_API_URL = 'https://relearn-backend.vercel.app/api/forms';
const FORM_API_URL = "http://localhost:5001/api/forms";
const LIBRARY_FORM_API_URL = "http://localhost:5001/api/library";
// const NOTES_API_URL = "https://relearn-backend.vercel.app/api"; // Add the notes API URL
const NOTES_API_URL = "http://localhost:5001/api"; // Add the notes API URL
// const LIBRARY_FORM_API_URL = 'https://relearn-backend.vercel.app/api/library';
import { showSuccess, showError } from "./utils/toast.js";

// Function to handle frontend login
export const frontLogin = async (loginData) => {
  try {
    const response = await fetch(`${USER_API_URL}/front-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError(data.message || "Login failed. Please check your credentials.");
      throw new Error(data.message || "Network response was not ok");
    }
    showSuccess("Login successful! Welcome back.");
    return data;
  } catch (error) {
    console.log(error)
    // if (!error.message.includes("Login failed")) {
    //   showError("Network error. Please check your connection and try again.");
    // }
    throw error;
  }
};

// Function to get user profile
export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${USER_API_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError(data.message || "Failed to fetch user profile.");
      throw new Error(data.message || "Network response was not ok");
    }
    
    return data;
  } catch (error) {
    if (!error.message.includes("Failed to fetch")) {
      showError("Network error. Please check your connection and try again.");
    }
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (token, profileData) => {
  try {
    const response = await fetch(`${USER_API_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError(data.message || "Failed to update profile.");
      throw new Error(data.message || "Network response was not ok");
    }
    
    showSuccess("Profile updated successfully!");
    return data;
  } catch (error) {
    if (!error.message.includes("Failed to update")) {
      showError("Network error. Please check your connection and try again.");
    }
    throw error;
  }
};

// Function to logout user
export const logout = async () => {
  try {
    const response = await fetch(`${USER_API_URL}/logout`, {
      method: "POST",
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError(data.message || "Failed to logout.");
      throw new Error(data.message || "Network response was not ok");
    }
    
    showSuccess("Logged out successfully!");
    return data;
  } catch (error) {
    if (!error.message.includes("Failed to logout")) {
      showError("Network error. Please check your connection and try again.");
    }
    throw error;
  }
};

// Base API URL

// 1. Create Form
export const createForm = async (formData) => {
  try {
    const response = await axios.post(`${FORM_API_URL}/create`, formData);
    showSuccess("Form created successfully!");
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error creating form");
    console.error("Error creating form:", error); // handle error
    throw error;
  }
};

// 2. Get All Forms
export const getAllForms = async (token) => {
  try {
    const response = await axios.get(`${FORM_API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.length)
    return response.data; // handle success response
  } catch (error) {
    if (error.response) {
      if (error.response.data.message === "Token expired") {
        // Handle token expiration
        localStorage.removeItem("token"); // Clear token from localStorage or wherever it's stored
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login"; // Redirect to the login page
      } else {
        // Handle other errors
        console.error("Error:", error.response.data);
      }
    } else {
      console.error("Error occurred while fetching forms:", error);
    }
    console.error("Error retrieving all forms:", error); // handle error
  }
};
// export const getAllFormsReport = async (token) => {
//   try {
//     const response = await axios.get(`${FORM_API_URL}/allReport`,{
//         headers:{
//             'Authorization':`Bearer ${token}`
//           }
//     });
//     // console.log(response.data.length)
//     return response.data; // handle success response
//   } catch (error) {

//     if (error.response) {
//       if (error.response.data.message === 'Token expired') {
//         // Handle token expiration
//         localStorage.removeItem('token'); // Clear token from localStorage or wherever it's stored
//         alert('Your session has expired. Please log in again.');
//         window.location.href = '/login';  // Redirect to the login page
//       } else {
//         // Handle other errors
//         console.error('Error:', error.response.data);
//       }
//     } else {
//       console.error('Error occurred while fetching forms:', error);
//     }
//     console.error("Error retrieving all forms:", error); // handle error
//   }
// };

// 3. Get Form by Link
export const getFormByLink = async (link) => {
  try {
    const headers = {};
    
    // Add secondary user token if available
    const formUserToken = localStorage.getItem("formUserToken");
    if (formUserToken) {
      headers["x-form-user-token"] = formUserToken;
    }

    const response = await axios.get(`${FORM_API_URL}/link/${link}`, { headers });
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    console.error("Error retrieving form by link:", error); // handle error
    throw error;
  }
};
export const getFormById = async (id) => {
  try {
    const response = await axios.get(`${FORM_API_URL}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving form by link:", error); // handle error
  }
};

// 4. Update Form
export const updateForm = async (formId, updatedData) => {
  try {
    const response = await axios.put(
      `${FORM_API_URL}/update/${formId}`,
      updatedData
    );
    showSuccess("Form updated successfully!");
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error updating form");
    console.error("Error updating form:", error); // handle error
    throw error;
  }
};

// 5. Delete Form
export const deleteForm = async (formId) => {
  try {
    const response = await axios.delete(`${FORM_API_URL}/delete/${formId}`);
    showSuccess("Form deleted successfully!");
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error deleting form");
    console.error("Error deleting form:", error); // handle error
    throw error;
  }
};
export const deleteManyForm = async (formsIds) => {
  try {
    console.log(formsIds);
    const response = await axios.delete(`${FORM_API_URL}/delete/many`, {
      data: {
        formsIds: formsIds,
      },
    });
    showSuccess("Forms deleted successfully!");
    console.log(response); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error deleting forms");
    console.error("Error deleting form:", error); // handle error
    throw error;
  }
};

// 6. Submit Form Responses
export const submitFormResponse = async (formLink, responses) => {
  try {
    const headers = {};
    
    // Add secondary user token if available
    const formUserToken = localStorage.getItem("formUserToken");
    if (formUserToken) {
      headers["x-form-user-token"] = formUserToken;
    }

    const response = await axios.post(`${FORM_API_URL}/submit`, {
      formLink,
      responses,
    }, { headers });
    showSuccess("Form submitted successfully!");
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error submitting form response");
    console.error("Error submitting form response:", error); // handle error
    throw error;
  }
};

// 7. Create Form from Template
export const createFormFromTemplate = async (templateId, formData) => {
  try {
    const response = await axios.post(`${FORM_API_URL}/create-from-template`, {
      templateId,
      formData,
    });
    showSuccess("Form created from template successfully!");
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error creating form from template");
    console.error("Error creating form from template:", error); // handle error
    throw error;
  }
};

export const createLibraryForm = async (formData) => {
  try {
    const response = await axios.post(
      `${LIBRARY_FORM_API_URL}/create`,
      formData
    );
    showSuccess("Library form created successfully!");
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error creating library form");
    console.error("Error creating form:", error); // handle error
    throw error;
  }
};

export const getAllLibraryForms = async (token) => {
  try {
    const response = await axios.get(`${LIBRARY_FORM_API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.length)
    return response.data; // handle success response
  } catch (error) {
    if (error.response) {
      if (error.response.data.message === "Token expired") {
        // Handle token expiration
        localStorage.removeItem("token"); // Clear token from localStorage or wherever it's stored
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login"; // Redirect to the login page
      } else {
        // Handle other errors
        console.error("Error:", error.response.data);
      }
    } else {
      console.error("Error occurred while fetching forms:", error);
    }
    console.error("Error retrieving all forms:", error); // handle error
  }
};

export const getLibraryFormById = async (id) => {
  try {
    const response = await axios.get(`${LIBRARY_FORM_API_URL}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving form by link:", error); // handle error
  }
};

export const updateLibraryForm = async (formId, updatedData, token) => {
  try {
    const response = await axios.put(
      `${LIBRARY_FORM_API_URL}/update/${formId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error updating library form");
    console.error("Error updating form:", error); // handle error
    throw error;
  }
};

export const deleteLibraryForm = async (formId, token) => {
  try {
    const response = await axios.delete(
      `${LIBRARY_FORM_API_URL}/delete/${formId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showSuccess("Library form deleted successfully!");
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error deleting library form");
    console.error("Error deleting form:", error); // handle error
    throw error;
  }
};
export const deleteManyLibraryForm = async (formsIds, token) => {
  try {
    console.log(formsIds);
    const response = await axios.delete(
      `${LIBRARY_FORM_API_URL}/delete/many`,
      {
        data: {
          formsIds: formsIds,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showSuccess("Library forms deleted successfully!");
    console.log(response); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error deleting library forms");
    console.error("Error deleting form:", error); // handle error
    throw error;
  }
};

export const updateFormVisibility = async (
  formId,
  visibility,
  selectedUsers,
  token
) => {
  try {
    console.log(formId);
    const response = await axios.put(
      `${LIBRARY_FORM_API_URL}/${formId}/visibility`,
      {
        visibility,
        sharedWith: selectedUsers, // Only needed if visibility is "shared"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showSuccess(response?.data?.message || "Form visibility updated successfully!");
    console.log(response?.data?.message); // handle success response
  } catch (error) {
    showError(error?.response?.data?.message || "Error updating form visibility");
    console.log(error.response.data.message);
    console.error("Error deleting form:", error); // handle error
  }
};

// Notes API Functions

// Get all notes for a project
export const getNotesByProject = async (projectId, userId = null) => {
  console.log("Trigeer get ")
  try {
    const params = userId ? { userId } : {};
    const response = await axios.get(`${NOTES_API_URL}/projects/${projectId}/notes`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

// Create a new note
export const createNote = async (projectId, noteData) => {
  try {
    const response = await axios.post(`${NOTES_API_URL}/projects/${projectId}/notes`, noteData);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
  }
};

// Update a note
export const updateNote = async (noteId, noteData) => {
  try {
    const response = await axios.put(`${NOTES_API_URL}/notes/${noteId}`, noteData);
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

// Delete a note
export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`${NOTES_API_URL}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

// Get a specific note
export const getNoteById = async (noteId) => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching note:", error);
  }
};

// Reference Links API Functions

// Get all reference links for a project
export const getReferencesByProject = async (projectId) => {
  try {
    const response = await axios.get(`${NOTES_API_URL}/projects/${projectId}/references`);
    return response.data;
  } catch (error) {
    console.error("Error fetching references:", error);
  }
};

// Create a new reference link
export const createReference = async (projectId, referenceData) => {
  try {
    const response = await axios.post(`${NOTES_API_URL}/projects/${projectId}/references`, referenceData);
    return response.data;
  } catch (error) {
    console.error("Error creating reference:", error);
  }
};

// Update a reference
export const updateReference = async (referenceId, referenceData) => {
  try {
    const response = await axios.put(`${NOTES_API_URL}/references/${referenceId}`, referenceData);
    return response.data;
  } catch (error) {
    console.error("Error updating reference:", error);
  }
};

// Delete a reference
export const deleteReference = async (referenceId) => {
  try {
    const response = await axios.delete(`${NOTES_API_URL}/references/${referenceId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting reference:", error);
  }
};

// Fetch content from a URL
export const fetchUrlContent = async (url) => {
  try {
    const response = await axios.post(`${NOTES_API_URL}/fetch-url-content`, { url });
    return response.data;
  } catch (error) {
    console.error("Error fetching URL content:", error);
  }
};

// Image Upload API Functions
const IMAGE_API_URL = "https://relearn-backend.vercel.app/api/images";

// Upload image to Cloudinary
export const uploadImage = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${IMAGE_API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Delete image from Cloudinary
export const deleteImage = async (publicId, token) => {
  try {
    const response = await axios.delete(`${IMAGE_API_URL}/delete/${publicId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

// Form User Management APIs for Frontend
const FORM_USER_API_URL = "http://localhost:5001/api/form-users";

export const loginFormUser = async (credentials) => {
  try {
    const response = await axios.post(`${FORM_USER_API_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in form user:", error);
    throw error;
  }
};

export const getAccessibleForms = async (token) => {
  try {
    const response = await axios.get(`${FORM_USER_API_URL}/accessible-forms`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching accessible forms:", error);
    throw error;
  }
};

// Form User Management APIs
export const createFormUser = async (formUserData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${FORM_USER_API_URL}/create`, formUserData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating form user:", error);
    throw error;
  }
};

export const getFormUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${FORM_USER_API_URL}/my-users`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching form users:", error);
    throw error;
  }
};

export const assignFormToUser = async (formId, userIds) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${FORM_USER_API_URL}/assign-to-form/${formId}`, {
      userIds
    }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error assigning form to users:", error);
    throw error;
  }
};

export const removeFormFromUser = async (formId, userIds) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${FORM_USER_API_URL}/remove-from-form/${formId}`, {
      userIds
    }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing form from users:", error);
    throw error;
  }
};

export const updateFormUser = async (userId, updateData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${FORM_USER_API_URL}/update/${userId}`, updateData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating form user:", error);
    throw error;
  }
};

export const deleteFormUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${FORM_USER_API_URL}/delete/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting form user:", error);
    throw error;
  }
};

// Check username availability
export const checkUsernameAvailability = async (username) => {
  try {
    const response = await axios.get(`${USER_API_URL}/check-username/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      return { available: false, message: "Username is already taken" };
    }
    throw error;
  }
};
