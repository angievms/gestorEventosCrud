import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Ajusta la URL base según tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a todas las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;