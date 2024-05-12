import axios from "axios";

// 5244949639

// Base URL for the hosted API for development environment
export const baseURL = "http://localhost:3000/";
// export const baseURL = "https://scuy1-api.onrender.com/";

const instance = axios.create({
  baseURL,
  timeout: 20000,
  withCredentials: true,
});

// Add token to request via interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers["Access-Control-Allow-Origin"] = true;
    }
    config.headers.Accept = "application/json";
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
