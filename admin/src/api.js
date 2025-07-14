import axios from "axios";
import { showSuccess, showError } from "./utils/toast.js";


const API_URL = "http://localhost:5001/api/forms";
const TEMPLATE_API_URL = "http://localhost:5001/api/templates"; // Add the template API URL

const USER_API_URL = "http://localhost:5001/api/users"; // Assuming this is the correct URL for users
const LIBRARY_FORM_API_URL = "http://localhost:5001/api/library";


export const createForm = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    showSuccess("Form created successfully!");
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error creating form");
    console.error("Error creating form:", error);
    throw error;
  }
};

export const getForms = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    showError("Error fetching forms. Please try again.");
    console.error("Error fetching forms:", error);
    throw error;
  }
};

export const getFormByLink = async (link) => {
  try {
    const response = await axios.get(`${API_URL}/link/${link}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching form by link:", error);
    throw error;
  }
};

export const submitFormResponse = async (responseData) => {
  console.log("Sending data:", responseData); // Log the data being sent
  try {
    const response = await axios.post(`${API_URL}/submit`, responseData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    showSuccess("Form submitted successfully!");
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error submitting form");
    console.error("Error submitting form response:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${USER_API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${USER_API_URL}/${id}`);
    showSuccess("User deleted successfully!");
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error deleting user");
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${USER_API_URL}/logout`);
    showSuccess("Logged out successfully!");
    return response.data;
  } catch (error) {
    showError("Error logging out. Please try again.");
    console.error("Error logging out:", error);
    throw error;
  }
};

// Add functions to handle templates

export const createTemplate = async (templateData) => {
  try {
    const response = await axios.post(`${TEMPLATE_API_URL}`, templateData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    showSuccess("Template created successfully!");
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error creating template");
    console.error("Error creating template:", error);
    throw error;
  }
};

export const getTemplates = async () => {
  try {
    const response = await axios.get(`${TEMPLATE_API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};

export const updateTemplate = async (templateId, updatedTemplateData) => {
  console.log(TEMPLATE_API_URL, templateId, updatedTemplateData);
  try {
    const response = await axios.put(
      `${TEMPLATE_API_URL}/${templateId}`,
      updatedTemplateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    showSuccess("Template updated successfully!");
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error updating template");
    console.error("Error updating template:", error);
    throw error;
  }
};

export const deleteTemplateById = async (templateId) => {
  try {
    const response = await axios.delete(`${TEMPLATE_API_URL}/${templateId}`);
    showSuccess("Template deleted successfully!");
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error deleting template");
    console.error("Error deleting template:", error);
    throw error;
  }
};

export const getTemplateById = async (templateId) => {
  try {
    const response = await axios.get(`${TEMPLATE_API_URL}/${templateId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching template:", error);
    throw error;
  }
};

export const frontLogin = async (loginData) => {
  try {
    const response = await axios.post(
      `${USER_API_URL}/front-login`,
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getAllUsersForm = async () => {
  try {
    const response = await axios.get(`${API_URL}/allUser`);
    return response.data;
  } catch (error) {
    console.error("Error fetching template:", error);
    throw error;
  }
};

export const createLibraryForm = async (formData) => {
  try {
    const response = await axios.post(
      `${LIBRARY_FORM_API_URL}/create`,
      formData
    );
    console.log(response.data); // handle success response
  } catch (error) {
    console.error("Error creating form:", error); // handle error
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
    const config = token ? {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    } : {};
    
    const response = await axios.put(
      `${LIBRARY_FORM_API_URL}/update/${formId}`,
      updatedData,
      config
    );
    showSuccess("Library form updated successfully!");
    console.log(response.data); // handle success response
    return response.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Error updating library form");
    console.error("Error updating form:", error); // handle error
    throw error;
  }
};

export const deleteLibraryForm = async (formId) => {
  try {
    const response = await axios.delete(
      `${LIBRARY_FORM_API_URL}/delete/${formId}`
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
export const deleteManyLibraryForm = async (formsIds) => {
  try {
    console.log(formsIds);
    const response = await axios.delete(`${LIBRARY_FORM_API_URL}/delete/many`, {
      data: {
        formsIds: formsIds,
      },
    });
    console.log(response); // handle success response
  } catch (error) {
    console.error("Error deleting form:", error); // handle error
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
