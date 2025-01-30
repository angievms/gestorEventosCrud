const Login = () => {
  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;