import { HttpError } from "@refinedev/core";
import axios from "axios";
import {TOKEN_KEY} from "../../authProvider.js";
import {API_URL} from "../index.js";

const axiosInstance = axios.create();

// Transform response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);


// Automatically include token in request
axiosInstance.interceptors.request.use(
    (config) => {
      // Retrieve the token from wherever it's stored
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Automatically refresh token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config;

      if (originalConfig.url !== `${API_URL}/authentication/login` && error.response) {
        // Check if the error is due to an expired access token
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const response = await axios.post(`${API_URL}/authentication/refresh-token`, {}, {
              withCredentials: true
            });

            // Assuming your API response contains the new token in response.data.token
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);

            // Update the original request with the new token and retry it
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            originalConfig.headers['Authorization'] = `Bearer ${response.data.token}`;

            return axios(originalConfig);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
      }

      return Promise.reject(error);
    }
);

export { axiosInstance };
