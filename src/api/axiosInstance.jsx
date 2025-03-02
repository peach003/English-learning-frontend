import axios from "axios";

// ✅ 创建 axios 实例
const api = axios.create({
    baseURL: "http://localhost:5000/api", // ✅ 修改为你的 .NET API 地址
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ 在请求拦截器中自动添加 JWT Token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // ✅ 从 localStorage 获取 JWT Token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// ✅ 处理 API 响应错误（可选）
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default api;

