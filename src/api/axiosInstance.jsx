import axios from "axios";

// Create an axios instance
const api = axios.create({
    baseURL: "http://localhost:5000/api", //  .NET API address
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically adding a JWT Token to a request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); //  Get JWT tokens from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

//  Handling API Response Errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;

