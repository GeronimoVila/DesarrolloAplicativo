import { Dependency } from '../../libs/dependency.js';
import { MissingParameterError } from '../../libs/missing_parameter_error.js';
import * as uuid from 'uuid';

export class TeamService {
  constructor() {
    this.teamData = Dependency.get('teamData');
  }

  async getList(filters, options) {
    return this.teamData.getList(filters, options);
  }

  async getForUuidOrNull(uuid) {
    const teamList = await this.teamData.getList({ uuid });
    if (teamList.length) {
      return teamList[0];
    }
    return null;
  }

  async create(data) {

    if (!data?.name) {
      throw new MissingParameterError('name');
    }

    data.uuid = uuid.v4();
    await this.teamData.create(data);
  }

  async delete(uuid) {
    if (!uuid) {
      throw new MissingParameterError('uuid');
    }

    const team = await this.getForUuidOrNull(uuid);
    if (!team) {
      throw new Error('Equipo no encontrado');
    }

    await this.teamData.deleteByUuid(uuid);
    return { message: 'Equipo eliminado correctamente' };
  }

  async update(uuid, updateData) {
    if (!uuid) {
      throw new MissingParameterError('uuid');
    }

    const team = await this.getForUuidOrNull(uuid);
    if (!team) {
      throw new Error('Equipo no encontrado');
    }

    const updatedTeam = await this.teamData.updateByUuid(uuid, updateData);
    return updatedTeam;
  }
}
