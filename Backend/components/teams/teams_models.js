import mongoose, { Schema } from 'mongoose';

export const TeamModel = mongoose.model(
  'Team',
  new Schema({
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    logo: { type: String },
    players: [{ name: String, position: String }],
    manager: { type: String },
  })
);

export class TeamMongo {
  async getList(filters) {
    return await TeamModel.find(filters).exec();
  }

  async create(data) {
    try {
      const newTeam = await TeamModel.create(data);
      return newTeam;
    } catch (error) {
      throw new Error(`Error al crear el equipo: ${error.message}`);
    }
  }

  async deleteByUuid(uuid) {
    try {
      const deletedTeam = await TeamModel.findOneAndDelete({ uuid }).exec();
      if (!deletedTeam) {
        throw new Error(`Equipo con UUID: ${uuid} no encontrado`);
      }
      return deletedTeam;
    } catch (error) {
      throw new Error(`Error al eliminar el equipo: ${error.message}`);
    }
  }

  async updateByUuid(uuid, updateData) {
    try {
      const updatedTeam = await TeamModel.findOneAndUpdate(
        { uuid },
        { $set: updateData },
        { new: true, runValidators: true }
      ).exec();

      if (!updatedTeam) {
        throw new Error(`Equipo con UUID: ${uuid} no encontrado`);
      }

      return updatedTeam;
    } catch (error) {
      throw new Error(`Error al actualizar el equipo: ${error.message}`);
    }
  }
}
