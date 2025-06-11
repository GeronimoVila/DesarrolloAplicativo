import { useState, useEffect } from "react";
import { Api } from "../services/Api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import '../styles/CreateTournament.css';

export const CreateTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const response = await Api.get("team");
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedTeams.length < 2) {
      toast.error("Debes seleccionar al menos dos equipos para crear un torneo.");
      return;
    }

    const newTournament = {
      name,
      description,
      teams: selectedTeams,
    };

    try {
      const response = await Api.post("tournament", {
        body: newTournament,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Torneo creado con éxito");
        handleGenerateMatches(data.uuid);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al crear el torneo:", error);
      toast.success("Error al crear el torneo.");
    }
  };

  const handleGenerateMatches = async (tournamentUuid) => {
    try {
      const response = await Api.post("tournament/generate-matches", {
        body: { uuid: tournamentUuid },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Partidos generados con éxito");
        navigate(`/tournaments/${tournamentUuid}`);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al generar los partidos:", error);
      toast.error("Error al generar los partidos.");
    }
  };

  const handleTeamSelection = (teamUuid) => {
    if (selectedTeams.includes(teamUuid)) {
      setSelectedTeams(selectedTeams.filter((uuid) => uuid !== teamUuid));
    } else {
      setSelectedTeams([...selectedTeams, teamUuid]);
    }
  };

  return (
    <div className="create-tournament-container">
      <div className="tournament-form-container">
        <h2 className="tournament-title">Crear Torneo</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">
              Nombre del Torneo:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description" className="input-label">
              Descripción del Torneo (Opcional):
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Selecciona los equipos:</label>
            <div className="teams-list">
              {teams.length === 0 ? (
                <p>No hay equipos disponibles.</p>
              ) : (
                teams.map((team) => (
                  <div key={team.uuid} className="team-item">
                    <label className="team-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedTeams.includes(team.uuid)}
                        onChange={() => handleTeamSelection(team.uuid)}
                        className="checkbox-input"
                      />
                      <span>{team.name}</span>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Crear Torneo
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTournament;