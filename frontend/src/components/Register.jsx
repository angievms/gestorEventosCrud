import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axiosConfig";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiClient.post("/usuarios/registro", {
        nombre,
        correo: email,
        contraseña: password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify({ nombre: response.data.nombre })
      );
      navigate("/eventos"); // Redirigir a la página de eventos después del registro
    } catch (err) {
      if (err.response) {
        setError(err.response.data.mensaje || "Error al registrarse");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="bg-white p-5 rounded shadow-sm" style={{ width: "400px" }}>
        <h2 className="h3 text-center mb-4">Registro</h2>
        {error && <p className="text-danger text-center mb-3">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              required
            />
          </div>
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
            Registrarse
          </button>
        </form>
        <p className="text-center mt-3">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-primary">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;