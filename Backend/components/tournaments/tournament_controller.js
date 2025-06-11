import { Dependency } from '../../libs/dependency.js';
import { checkPermission } from '../../libs/check_permision.js';

export class TournamentController {
  constructor() {
    this.tournamentService = Dependency.get('tournamentService');
  }

  async get(req, res) {
    const tournamentList = await this.tournamentService.getList();
    res.send(tournamentList);
  }

  async post(req, res) {
    checkPermission(req, 'admin');

    try {
      const tournamentId = await this.tournamentService.create(req.body);
      res.status(200).send({
        message: 'Tournament created successfully',
        uuid: tournamentId
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

    const { uuid } = req.body;

    try {
      const result = await this.tournamentService.delete(uuid);
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
      const updatedTournament = await this.tournamentService.update(uuid, updateData);
      res.status(200).send({
        message: 'Tournament updated successfully',
        tournament: updatedTournament
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async generateMatches(req, res) {
    checkPermission(req, 'admin');

    const { uuid } = req.body;

    try {
      const matches = await this.tournamentService.generateMatches(uuid);
      res.status(200).send({
        message: 'Matches generated successfully',
        matches,
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async saveResults(req, res) {
    checkPermission(req, 'admin');

    const { uuid } = req.params;
    const { matches } = req.body;
    
    try {
      const updatedTournament = await this.tournamentService.saveResults(uuid, matches);
      res.status(200).send({
        message: 'Results saved successfully',
        tournament: updatedTournament
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async getForUuid(req, res) {
    checkPermission(req, 'admin');
    const { uuid } = req.params;

    try {
      const tournament = await this.tournamentService.getForUuid(uuid);
      res.status(200).send(tournament);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }

  async getPositions(req, res) {
    const { uuid } = req.params;

    try {
      const positions = await this.tournamentService.getPositions(uuid);
      res.status(200).send(positions);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }
}
