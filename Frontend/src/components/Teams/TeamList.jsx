import { useEffect, useState } from "react";
import { Api } from "../../services/Api.js";
import { FaTrash } from "react-icons/fa";
import "../../styles/TeamList.css";
import PropTypes from 'prop-types';

export const TeamList = ({ refreshTeams }) => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await Api.get('team');
      const data = await response.json();

      if (response.ok) {
        setTeams(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener los equipos:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [refreshTeams]);

  const handleDelete = async (id) => {
    const teamId = id;
    try {
      const response = await Api.post(`team/delete/${teamId}`);
      console.log(response);
      if (response.ok) {
        fetchTeams();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar el equipo:", error);
    }
  };

  return (
    <div className="team-list-container">
      <div className="team-grid">
        {teams.length === 0 ? (
          <div className="no-teams-message">
            No hay equipos cargados.
          </div>
        ) : (
          teams.map((team) => (
            <div key={team.uuid} className="team-card">
              <h3 className="team-name">{team.name}</h3>
              <p className="team-description">
                <strong>Descripción:</strong> {team.description || "Sin descripción"}
              </p>
              <p className="team-manager">
                <strong>Director Técnico (DT):</strong> {team.manager || "Sin DT"}
              </p>
              <div>
                <h4 className="players-title">Jugadores:</h4>
                <ul className="players-list">
                  {team.players.map((player, index) => (
                    <li key={index} className="player-item">
                      {player.name} - {player.position}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleDelete(team.uuid)}
                value={team.uuid}
                id={team.uuid}
                className="delete-button"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

TeamList.propTypes = {
  refreshTeams: PropTypes.func.isRequired,  
};