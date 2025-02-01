import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { House, PersonCircle } from "react-bootstrap-icons";

const Header = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/Login");
  };

  return (
    <header className="bg-dark text-white py-3">
      <nav className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none text-white d-flex align-items-center">
          <House className="me-3" />
          <h1 className="h4 mb-0">Gestor de Eventos</h1>
        </Link>
        <div className="d-flex align-items-center">
          {location.pathname === "/eventos" && usuario ? (
            <>
              <div className="d-flex align-items-center me-3">
                <PersonCircle className="me-2" />
                <span>{usuario.nombre}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline-danger">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
            <Link to="/registro" className="register-link me-3">
            Registrarse
          </Link>
            <Link to="/login" className="btn btn-outline-light">
              Iniciar Sesión
            </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;