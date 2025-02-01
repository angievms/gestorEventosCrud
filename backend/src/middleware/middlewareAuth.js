const jwt = require("jsonwebtoken");

const middlewareAutenticacion = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token del header

  if (!token) {
    return res.status(403).json({ mensaje: "Se requiere token de autenticación" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: "Token inválido", error: error.message });
    }
    req.usuario = decoded; // Agregar el usuario decodificado a req.usuario
    console.log("Usuario decodificado:", decoded); // Depuración
    req.usuario = decoded; // Agregar el usuario decodificado a req.usuario
    next();
  });
};

module.exports = middlewareAutenticacion;