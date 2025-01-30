import EventCard from "../components/EventCard";

const Eventos = () => {
  const eventos = [
    {
      nombre: "Conferencia React",
      fecha: "2025-02-15",
      hora: "10:00 AM",
      ubicacion: "Auditorio Principal",
      descripcion: "Evento sobre las últimas novedades de React.",
    },
    {
      nombre: "Taller de Node.js",
      fecha: "2025-02-20",
      hora: "2:00 PM",
      ubicacion: "Sala 202",
      descripcion: "Aprende lo esencial de Node.js en este taller.",
    },
  ];

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Eventos</h1>
      {eventos.map((evento, index) => (
        <EventCard key={index} {...evento} />
      ))}
    </div>
  );
};

export default Eventos;
