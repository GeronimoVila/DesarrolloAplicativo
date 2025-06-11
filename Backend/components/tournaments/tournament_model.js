import mongoose, { Schema } from 'mongoose';
import { TeamModel } from '../teams/teams_models.js';

export const TournamentModel = mongoose.model(
  'Tournament',
  new Schema({
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    teams: [{ type: String, ref: 'Team' }],
    matches: [
      {
        teamA: { type: String, ref: 'Team' },
        teamB: { type: String, ref: 'Team' },
        result: String,
        winner: String,
      }
    ],
    description: { type: String },
  })
);

export class TournamentMongo {
  async getList(filters) {
    const tournaments = await TournamentModel.find(filters).exec();
    return tournaments;
  }

  async create(data) {
    try {
      const newTournament = await TournamentModel.create(data);
      return newTournament.toObject().uuid;
    } catch (error) {
      throw new Error(`Error al crear el torneo: ${error.message}`);
    }
  }

  async deleteByUuid(uuid) {
    try {
      const deletedTournament = await TournamentModel.findOneAndDelete({ uuid }).exec();
      if (!deletedTournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }
      return deletedTournament;
    } catch (error) {
      throw new Error(`Error al eliminar el torneo: ${error.message}`);
    }
  }

  async updateByUuid(uuid, updateData) {
    try {
      const updatedTournament = await TournamentModel.findOneAndUpdate(
        { uuid },
        { $set: updateData },
        { new: true, runValidators: true }
      ).exec();

      if (!updatedTournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }

      return updatedTournament;
    } catch (error) {
      throw new Error(`Error al actualizar el torneo: ${error.message}`);
    }
  }

  async getForUuid(uuid) {
    try {
      let tournament = await TournamentModel.findOne({ uuid }).exec();

      if (!tournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }

      const matchesWithNames = await Promise.all(
        tournament.matches.map(async (match) => {
          const teamA = await TeamModel.findOne({ uuid: match.teamA }).exec();
          const teamB = await TeamModel.findOne({ uuid: match.teamB }).exec();

          return {
            ...match._doc,
            teamA: {
              uuid: match.teamA,
              name: teamA ? teamA.name : 'Equipo no encontrado',
            },
            teamB: {
              uuid: match.teamB,
              name: teamB ? teamB.name : 'Equipo no encontrado',
            },
          };
        })
      );

      return {
        ...tournament._doc,
        matches: matchesWithNames,
      };
    } catch (error) {
      throw new Error(`Error al obtener el torneo: ${error.message}`);
    }
  }

  async saveResults(uuid, matches) {
    try {
      const tournament = await TournamentModel.findOneAndUpdate(
        { uuid },
        { $set: { matches } },
        { new: true, runValidators: true }
      ).exec();

      if (!tournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }

      return tournament;
    } catch (error) {
      throw new Error(`Error al guardar los resultados: ${error.message}`);
    }
  }

  async generateMatches(uuid) {
    try {
      const tournament = await TournamentModel.findOne({ uuid }).exec();
      if (!tournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }

      const teams = tournament.teams;
      const matches = [];

      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matches.push({
            teamA: teams[i],
            teamB: teams[j],
            result: '',
            winner: ''
          });
        }
      }

      tournament.matches = matches;
      await TournamentModel.updateOne({ uuid }, { matches }).exec();

      return matches;
    } catch (error) {
      throw new Error(`Error al generar los partidos: ${error.message}`);
    }
  }

  async getPositions(uuid) {
    try {
      const tournament = await TournamentModel.findOne({ uuid }).exec();
      if (!tournament) {
        throw new Error(`Torneo con UUID: ${uuid} no encontrado`);
      }

      const teams = tournament.teams;
      const matches = tournament.matches;

      const positions = {};

      for (const teamUuid of teams) {
        const team = await TeamModel.findOne({ uuid: teamUuid }).exec(); 
        positions[teamUuid] = {
          team: teamUuid,  
          name: team ? team.name : 'Equipo no encontrado',
          points: 0,
          matches: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0
        };
      }

      for (const match of matches) {
        const { teamA, teamB, result } = match;

        if (result) {
          const [teamAResult, teamBResult] = result.split('-').map(Number);

          positions[teamA].matches++;
          positions[teamB].matches++;

          positions[teamA].goalsFor += teamAResult;
          positions[teamA].goalsAgainst += teamBResult;
          positions[teamB].goalsFor += teamBResult;
          positions[teamB].goalsAgainst += teamAResult;

          if (teamAResult > teamBResult) {
            positions[teamA].points += 3;
            positions[teamA].wins++;
            positions[teamB].losses++;
          } else if (teamAResult < teamBResult) {
            positions[teamB].points += 3;
            positions[teamB].wins++;
            positions[teamA].losses++;
          } else {
            positions[teamA].points++;
            positions[teamB].points++;
            positions[teamA].draws++;
            positions[teamB].draws++;
          }

          positions[teamA].goalDifference = positions[teamA].goalsFor - positions[teamA].goalsAgainst;
          positions[teamB].goalDifference = positions[teamB].goalsFor - positions[teamB].goalsAgainst;
        }
      }

      const sortedPositions = Object.values(positions).sort(
        (a, b) => b.points - a.points || b.goalDifference - a.goalDifference
      );

      return sortedPositions;
    } catch (error) {
      throw new Error(`Error al obtener la tabla: ${error.message}`);
    }
  }

}
