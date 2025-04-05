import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://127.0.0.1:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Transform the data while keeping the original AxiosResponse structure
    response.data = {
      ...response.data,
      status: response.status,
    };
    return response;
  },
  (error) => {
    window.location.href = "/";
    return Promise.reject(error.response);
  },
);

export default axiosInstance;
