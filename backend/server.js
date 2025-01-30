const app = require('./src/app');

// Configurar el puerto
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});
