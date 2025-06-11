import { useState } from "react";
import { Api } from "../services/Api.js";
import { TeamList } from "../components/Teams/TeamList.jsx";
import { toast } from "sonner";
import '../styles/CreateTeam.css';

export const CreateTeam = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [dt, setDt] = useState('');
  const [jugadores, setJugadores] = useState([{ name: "", position: "" }]);
  const [refreshTeams, setRefreshTeams] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newTeam = {
      name: nombre,
      description: descripcion,
      manager: dt,
      players: [],
    }

    jugadores.forEach((jugador, index) => {
      newTeam.players[index] = {
        name: jugador.name,
        position: jugador.position
      };
    });

    try {
      const response = await Api.post('team', { body: newTeam });
      const data = await response.json();
      if (response.ok) {
        toast.success('Equipo cargado correctamente');
        setNombre('');
        setDescripcion('');
        setDt('');
        setJugadores([{ name: "", position: "" }]);
        setRefreshTeams((prev) => !prev);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error al cargar el equipo:', error);
      toast.error('Ocurrió un error al cargar el equipo');
    }
  };

  const handleJugadorChange = (index, event) => {
    const { name, value } = event.target;
    const updatedJugadores = [...jugadores];
    updatedJugadores[index][name] = value;
    setJugadores(updatedJugadores);
  };

  const handleAddJugador = () => {
    setJugadores([...jugadores, { name: "", position: "" }]);
  };

  const handleRemoveJugador = (index) => {
    const updatedJugadores = [...jugadores];
    updatedJugadores.splice(index, 1);
    setJugadores(updatedJugadores);
  };

  return (
    <section>
      <div className="create-team-container">
        <div className="form-container">
          <h2 className="title">Cargar Equipo</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nombre" className="label">
                Nombre del Equipo:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="descripcion" className="label">
                Descripción del Equipo (Opcional):
              </label>
              <input
                type="text"
                id="descripcion"
                name="description"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="dt" className="label">
                Director Técnico (DT):
              </label>
              <input
                type="text"
                id="dt"
                name="dt"
                value={dt}
                onChange={(e) => setDt(e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Jugadores:</label>
              {jugadores.map((jugador, index) => (
                <div key={index} className="jugador-input">
                  <input
                    type="text"
                    name="name"
                    value={jugador.name}
                    onChange={(e) => handleJugadorChange(index, e)}
                    placeholder="Nombre del Jugador"
                    className="input"
                    required
                  />
                  <input
                    type="text"
                    name="position"
                    value={jugador.position}
                    onChange={(e) => handleJugadorChange(index, e)}
                    placeholder="Posición"
                    className="input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveJugador(index)}
                    className="remove-btn"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddJugador}
                className="add-btn"
              >
                Agregar Jugador
              </button>
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Crear Equipo
            </button>
          </form>
        </div>
      </div>
      <TeamList refreshTeams={refreshTeams} />
    </section>
  );
};

export default CreateTeam;