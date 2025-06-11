import "../styles/Home.css";

export const Home = () => {
  return (
    <section className="home-section">
      <div className="container">
        <div className="text-center mb-20">
          <h1 className="title">¡Bienvenido a la Federacion Sanjuanina de Basquet!</h1>
          <p className="description">
            La Federación de Básquet se dedica a promover y desarrollar el deporte del básquetbol en todas sus formas. Nos enorgullecemos de apoyar a jugadores, entrenadores y aficionados, brindando recursos, organizando torneos y facilitando el acceso a entrenamientos
          </p>
          <div className="line"></div>
        </div>
        <div className="cards-container">
          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Crea Tu Equipo</h2>
              <p className="card-description">
                Puedes crear y gestionar tus propios equipos de básquet. Añade jugadores, define roles y mantén toda la información de tu equipo organizada en un solo lugar.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Crea Tu Torneo</h2>
              <p className="card-description">
                Organiza torneos personalizados y agrega tus equipos participantes. Define el formato del torneo y sigue el progreso de cada partido.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h2 className="card-title">Carga los Resultados</h2>
              <p className="card-description">
                Registra los resultados de los partidos y visualiza la tabla de posiciones de los torneos. Mantén a todos informados sobre el rendimiento de los equipos y el avance del torneo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};