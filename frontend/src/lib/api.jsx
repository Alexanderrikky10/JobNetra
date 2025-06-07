import axios from "axios";
import { env } from "../env";
import { getToken } from "../hooks/authToken";

const api = axios.create({
  baseURL: env.BACKEND_API_URL,
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
  (error) => Promise.reject(error)
);

export default api;
