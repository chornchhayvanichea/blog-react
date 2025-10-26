import axios from "axios";
import API_ENDPOINTS from "../constants/apiEndPoints";
import { clearAuthData, getToken } from "../utils/localStorage";

const api = axios.create({
  baseURL: API_ENDPOINTS.BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Remove response interceptor for now - let components handle errors
// We'll add it back later if needed

export default api;
