/**
 * @module Config
 * @description
 * API configuration module that sets up an Axios instance with interceptors
 * and authentication handling for the form builder's backend communication.
 * @category API
 */

import axios from "axios";

/**
 * Configured Axios instance for all API communications.
 *
 * @constant
 * @category API
 * @since 1.0.0
 *
 * @remarks
 * This Axios instance is configured with:
 * - Base URL configuration from environment variables
 * - Default request timeout
 * - Authentication token handling
 * - Automatic token refresh
 * - Error handling and retries
 *
 * Features:
 * - Automatic token injection for authenticated requests
 * - Token refresh handling for 401 responses
 * - Consistent error handling
 * - Request/response interceptors
 * - Environment-based configuration
 *
 * Security:
 * - Token-based authentication
 * - Secure token storage
 * - Automatic session management
 * - Authorization header handling
 *
 * @example
 * ```typescript
 * // Making an authenticated API request
 * import { api } from '@config/api';
 *
 * async function fetchUserData() {
 *   try {
 *     const response = await api.get('/user/profile');
 *     return response.data;
 *   } catch (error) {
 *     console.error('Failed to fetch user data:', error);
 *   }
 * }
 * ```
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized responses
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/auth/refresh", { refreshToken });
        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        // Refresh token failed, redirect to login
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
