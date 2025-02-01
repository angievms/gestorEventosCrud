import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Registro from "./components/Register";
import EventList from "./components/EventList";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Verificar si el usuario está autenticado
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/eventos" element={<EventList />} />
        <Route
          path="/eventos"
          element={isAuthenticated ? <EventList /> : <Navigate to="/login" />} // Proteger la ruta /eventos
        />
      </Routes>
    </div>
  );
};

export default App;