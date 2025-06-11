import { Dependency } from '../../libs/dependency.js';
import { checkPermission } from '../../libs/check_permision.js';

export class TeamController {
  constructor() {
    this.teamService = Dependency.get('teamService');
  }

  async get(req, res) {
    checkPermission(req, 'admin');

    const teamList = await this.teamService.getList();
    res.send(teamList);
  }

  async post(req, res) {
    checkPermission(req, 'admin');

    try {
      await this.teamService.create(req.body);

      res.status(200).send({
        message: 'Team created successfully',
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async delete(req, res) {
    checkPermission(req, 'admin');
    
    const { uuid } = req.params;

    try {
      const result = await this.teamService.delete(uuid);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async update(req, res) {
    checkPermission(req, 'admin');

    const { uuid } = req.body;
    const updateData = req.body;

    try {
      const updatedTeam = await this.teamService.update(uuid, updateData);
      res.status(200).send({
        message: 'Team updated successfully',
        team: updatedTeam
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }
}
