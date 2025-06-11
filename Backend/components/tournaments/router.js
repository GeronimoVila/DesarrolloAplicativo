import { asyncHandler } from '../../libs/async_handler.js';
import { TournamentController } from './tournament_controller.js';

export function configureTournamentRoutes(router) {
  router.get('/tournament', asyncHandler(TournamentController, 'get'));
  router.post('/tournament', asyncHandler(TournamentController, 'post'));
  router.post('/tournament/delete', asyncHandler(TournamentController, 'delete'));
  router.post('/tournament/update', asyncHandler(TournamentController, 'update'));
  router.post('/tournament/generate-matches', asyncHandler(TournamentController, 'generateMatches'));
  router.post('/tournament/:uuid', asyncHandler(TournamentController, 'getForUuid'));
  router.post('/tournament/:uuid/save-results', asyncHandler(TournamentController, 'saveResults'));
  router.post('/get-positions/:uuid', asyncHandler(TournamentController, 'getPositions'));
}
