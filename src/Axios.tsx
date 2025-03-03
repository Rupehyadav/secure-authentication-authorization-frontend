import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTHENTICATION_AUTHORIZATION_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
