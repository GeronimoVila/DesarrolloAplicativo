import { useEffect, useState } from "react";
import { Api } from "../services/Api.js";
import "../styles/PositionTable.css";

export const TournamentsWithPositions = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTournaments = async () => {
    try {
      const response = await Api.get("tournament");
      const data = await response.json();

      if (response.ok) {
        setTournaments(data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Error al obtener torneos:", err);
    }
  };

  const fetchPositions = async (tournamentId) => {
    setLoading(true);
    try {
      const response = await Api.post(`get-positions/${tournamentId}`);
      const data = await response.json();
      if (response.ok) {
        // Ordenar los equipos por partidos ganados (descendente) y partidos perdidos (ascendente)
        const sortedPositions = data.sort((a, b) => {
          if (b.wins !== a.wins) {
            return b.wins - a.wins;
          }
          return a.losses - b.losses;
        });
        setPositions(sortedPositions);
        setSelectedTournament(tournamentId);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Torneos</h2>

      <div className="select-container">
        <select
          className="select"
          onChange={(e) => fetchPositions(e.target.value)}
        >
          <option value="">Selecciona un torneo</option>
          {tournaments.map((tournament) => (
            <option key={tournament.uuid} value={tournament.uuid}>
              {tournament.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTournament && (
        <>
          <h3 className="subtitle">
            Tabla de Posiciones - {tournaments.find(t => t.uuid === selectedTournament)?.name}
          </h3>

          {loading ? (
            <p className="loading">Cargando tabla de posiciones...</p>
          ) : error ? (
            <p className="error">Error: {error}</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th className="th">Posición</th>
                    <th className="th">Equipo</th>
                    <th className="th">G</th>
                    <th className="th">P</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-message">
                        No hay posiciones disponibles.
                      </td>
                    </tr>
                  ) : (
                    positions.map((team, index) => (
                      <tr key={team.team}>
                        <td className="td">{index + 1}</td>
                        <td className="td">{team.name}</td>
                        <td className="td">{team.wins}</td>
                        <td className="td">{team.losses}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TournamentsWithPositions;