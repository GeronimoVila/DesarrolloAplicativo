import { Dependency } from '../../libs/dependency.js';
import { InvalidCredentialsError } from '../../libs/invalid_credential_error.js';
import { MissingParameterError } from '../../libs/missing_parameter_error.js';
import jwt from 'jsonwebtoken';

export class LoginService {
  constructor() {
    this.userService = Dependency.get('userService');
    this.conf = Dependency.get('conf');
  }

  async login(data) {
    try {
      if (!data?.username) {
        return { error: "El campo 'username' es obligatorio." };
      }
      if (!data.password) {
        return { error: "El campo 'password' es obligatorio." };
      }

      const user = await this.userService.getForUsernameOrNull(data.username);
      if (!user) {
        return { error: `No existe el usuario ${data.username}` };
      }

      if (!user.isEnabled) {
        return { error: `El usuario '${data.username}' no tiene permiso para acceder.` };
      }

      const isPasswordValid = await this.userService.checkPassword(data.password, user.hashedPassword);
      if (!isPasswordValid) {
        return { error: "Contraseña incorrecta." };
      }

      return this.generateManualToken(user);
    } catch (error) {
      console.error("❌ Error en login:", error);
      return { error: "Ocurrió un error interno. Intenta nuevamente más tarde." };
    }
  }

  // Método para generar un nuevo token manualmente
  generateManualToken(user) {
    const payload = {
      username: user.username,
      displayName: user.displayName,
      userUuid: user.uuid,
      roles: Array.isArray(user.roles) ? user.roles : [],
      isEnabled: user.isEnabled
    };

    const token = jwt.sign(payload, this.conf.jwtPassword, {
      expiresIn: '24h',
    });

    return {
      authorizationToken: token,
      roles: Array.isArray(user.roles) ? user.roles : [],
      isAuthenticated: true,  // ✅ Se agrega esta propiedad en la respuesta
    };
  }
}