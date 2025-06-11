import { configureUserRoutes } from './components/users/routes.js';
import { configureLoginRoutes } from './components/login/routes.js';
import { configureTeamRoutes } from './components/teams/router.js';
import { configureTournamentRoutes } from './components/tournaments/router.js';

export function configureRoutes(router) {
  configureUserRoutes(router);
  configureLoginRoutes(router);
  configureTeamRoutes(router);
  configureTournamentRoutes(router);
}