import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import App from "./App";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve la aplicación con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);