import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-4 fw-bold text-dark mb-4">Bienvenido a mi Gestor de Eventos</h1>
        <p className="lead text-secondary">Crea, edita, elimina o simplemente gestiona tus eventos en esta increíble aplicación..</p>
        <button
          onClick={handleStartClick}
          className="btn btn-primary btn-lg mt-4"
        >
          Empezar
        </button>
      </div>
    </div>
  );
};

export default Home;