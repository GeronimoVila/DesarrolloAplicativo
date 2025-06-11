import { Dependency } from '../../libs/dependency.js';

export class LoginController {
  constructor(){
    this.loginService = Dependency.get('loginService');
  }

  async post(req, res) {
    try {
      const result = await this.loginService.login(req.body);
      res.json(result); // Enviar respuesta en formato JSON
    } catch (error) {
      res.status(400).json({ error: error.message }); // Manejo de errores
    }
  }
}