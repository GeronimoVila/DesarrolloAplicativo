import { Dependency } from './libs/dependency.js';
import { UserService } from './components/users/user_service.js';
import { UserMongo } from './components/users/user_model.js';
import { LoginService } from './components/login/login_service.js';
import { conf } from './conf.js';
import { TeamService } from './components/teams/teams_service.js';
import { TournamentService } from './components/tournaments/tournament_service.js';
import { TeamMongo } from './components/teams/teams_models.js';
import { TournamentMongo } from './components/tournaments/tournament_model.js';

export function configureDependencies() {
  Dependency.add('conf', conf);
  Dependency.add('userService', () => new UserService());
  Dependency.add('userData', () => new UserMongo());
  Dependency.add('loginService', () => new LoginService());

  Dependency.add('tournamentData', () => new TournamentMongo());
  Dependency.add('teamData', () => new TeamMongo());
  Dependency.add('teamService', () => new TeamService());
  Dependency.add('tournamentService', () => new TournamentService());
}