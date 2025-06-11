import { asyncHandler } from '../../libs/async_handler.js';
import { LoginController } from './login_controller.js';

export function configureLoginRoutes(router) {  
  router.post('/login', asyncHandler(LoginController, 'post'));
}