import axios from 'axios';
import { showError } from './utils/toast.js';

// https://relearn-backend.vercel.app

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

// Add a response interceptor for global error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors globally
        if (error.response?.status === 401) {
            showError('Session expired. Please login again.');
            // Clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('tokenTime');
            window.location.href = '/login';
        } else if (error.response?.status === 403) {
            showError('Access denied. You do not have permission to perform this action.');
        } else if (error.response?.status === 500) {
            showError('Server error. Please try again later.');
        } else if (!error.response) {
            showError('Network error. Please check your connection.');
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;