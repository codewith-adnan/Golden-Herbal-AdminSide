import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("🔑 axiosInstance: Token found in localStorage:", !!token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        const fullUrl = `${config.baseURL || ''}${config.url}`;
        console.log(`🚀 API Request: [${config.method?.toUpperCase()}] ${fullUrl}`, {
            params: config.params,
            headers: config.headers
        });
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: [${response.config.url}]`, response.data);
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error("🔒 Unauthorized! Redirecting to login...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
