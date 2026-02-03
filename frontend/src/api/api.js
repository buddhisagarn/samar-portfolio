import axios from "axios";

const API = axios.create({
  // import.meta.env.VITE_API_URI ||
  baseURL: `${import.meta.env.VITE_API_URI}/api`,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
