import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importa Navigate aquí
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Register';
import EventList from './components/EventList';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        {/* Ruta protegida para /eventos */}
        <Route
          path="/eventos"
          element={isAuthenticated ? <EventList /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;