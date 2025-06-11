import { Dependency } from '../../libs/dependency.js';
import { MissingParameterError } from '../../libs/missing_parameter_error.js';
import { v4 as uuidv4 } from 'uuid';

export class TournamentService {
  constructor() {
    this.tournamentData = Dependency.get('tournamentData');
  }

  async getList(filters = {}) {
    return this.tournamentData.getList(filters);
  }

  async create(data) {
    if (!data?.name) {
      throw new MissingParameterError('name');
    }
    if (!data.teams || data.teams.length < 2) {
      throw new MissingParameterError('teams');
    }

    const newTournament = {
      uuid: uuidv4(),
      name: data.name,
      description: data.description || '',
      teams: data.teams,
      matches: [],
    };

    return await this.tournamentData.create(newTournament);
  }

  async delete(uuid) {
    if (!uuid) {
      throw new MissingParameterError('uuid');
    }

    const deletedTournament = await this.tournamentData.deleteByUuid(uuid);
    if (!deletedTournament) {
      throw new Error('Torneo no encontrado');
    }

    return { message: 'Torneo eliminado correctamente' };
  }

  async update(uuid, updateData) {
    if (!uuid) {
      throw new MissingParameterError('uuid');
    }

    const updatedTournament = await this.tournamentData.updateByUuid(uuid, updateData);
    if (!updatedTournament) {
      throw new Error('Torneo no encontrado');
    }

    return updatedTournament;
  }

  async getForUuid(uuid) {
    return this.tournamentData.getForUuid(uuid);
  }

  async generateMatches(uuid) {
    return this.tournamentData.generateMatches(uuid);
  }

  async saveResults(uuid, matches) {
    if (!uuid || !matches) {
      throw new MissingParameterError('uuid o matches');
    }

    return this.tournamentData.saveResults(uuid, matches);
  }

  async getPositions(uuid) {
    return this.tournamentData.getPositions(uuid);
  }
}
