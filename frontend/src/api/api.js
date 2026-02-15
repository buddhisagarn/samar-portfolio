import axios from "axios";

const API = axios.create({
  // import.meta.env.VITE_API_URI ||
  baseURL: "https://samar-portfolio.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
