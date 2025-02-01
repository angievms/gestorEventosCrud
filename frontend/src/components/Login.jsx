import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiClient.post("/usuarios/login", {
        correo: email,
        contraseña: password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify({ nombre: response.data.nombre })
      );
      navigate("/eventos");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.mensaje || "Error al iniciar sesión");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="bg-white p-5 rounded shadow-sm" style={{ width: "400px" }}>
        <h2 className="h3 text-center mb-4">Iniciar Sesión</h2>
        {error && <p className="text-danger text-center mb-3">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;