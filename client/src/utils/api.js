import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44388/api/",
});

api.interceptors.request.use((o) => {
  const token = localStorage.getItem("user_token");
  o.headers.Authorization = token ? `Bearer ${token}` : "";
  return o;
});

export default api;