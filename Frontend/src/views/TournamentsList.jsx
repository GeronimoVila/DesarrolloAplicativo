import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/Api.js";
import '../styles/TournamentsList.css';

export const TournamentsList = () => {
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  const fetchTournaments = async () => {
    try {
      const response = await Api.get('tournament');
      const data = await response.json();

      if (response.ok) {
        setTournaments(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener los torneos:", error);
    }
  };

  // Obtener los torneos al montar el componente
  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="tournament-list-container">
      <div className="tournament-list-box">
        <h2 className="tournament-list-title">Torneos Disponibles</h2>
        {tournaments.length === 0 ? (
          <p className="no-tournaments">No hay torneos disponibles.</p>
        ) : (
          <ul className="tournament-list">
            {tournaments.map((tournament) => (
              <li
                key={tournament.uuid}
                className="tournament-item"
                onClick={() => navigate(`/tournaments/${tournament.uuid}`)}
              >
                {tournament.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TournamentsList;