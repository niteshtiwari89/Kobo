import axios from 'axios';
import { showError } from './utils/toast.js';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api', // Update this URL if your backend is hosted elsewhere
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            
            if (status === 401) {
                showError('Session expired. Please login again.');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (status === 400) {
                // Handle validation errors and duplicate key errors
                if (data.message) {
                    if (data.message.includes('duplicate key') || data.message.includes('E11000')) {
                        if (data.message.includes('username')) {
                            showError('This username is already taken. Please choose a different username.');
                        } else {
                            showError('This information is already in use. Please try different details.');
                        }
                    } else {
                        showError(data.message);
                    }
                } else {
                    showError('Invalid request. Please check your input and try again.');
                }
            } else if (status === 409) {
                // Conflict - typically used for duplicate resources
                showError(data.message || 'This information is already in use. Please try different details.');
            } else if (status >= 500) {
                showError('Server error. Please try again later.');
            } else if (status === 404) {
                showError(data.message || 'Resource not found.');
            } else {
                // Other client errors
                showError(data.message || 'An error occurred. Please try again.');
            }
        } else if (error.request) {
            // Network error
            showError('Network error. Please check your connection.');
        } else {
            // Something else happened
            showError('An unexpected error occurred. Please try again.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;