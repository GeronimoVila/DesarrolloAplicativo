import { asyncHandler } from '../../libs/async_handler.js';
import { TeamController } from './team_controller.js';

export function configureTeamRoutes(router) {
  router.get('/team', asyncHandler(TeamController, 'get'));
  router.post('/team', asyncHandler(TeamController, 'post'));
  router.post('/team/delete/:uuid', asyncHandler(TeamController, 'delete'));
  router.post('/team/update', asyncHandler(TeamController, 'update'));
}
