import { Dependency } from '../../libs/dependency.js';
import { MissingParameterError } from '../../libs/missing_parameter_error.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

export class UserService {
  constructor() {
    this.userData = Dependency.get('userData');
  }

  async getList(filters, options) {
    return this.userData.getList(filters, options);
  }

  async getForUsernameOrNull(username) {
    const userList = await this.userData.getList({ username });
    if (userList.length) {
      return userList[0];
    }
    return null;
  }

  async getForUuidOrNull(uuid) {
    const userList = await this.userData.getList({ uuid });
    if (userList.length) {
      return userList[0];
    }
    return null;
  }

  async hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  async create(data) {
    if (!data?.username) {
      throw new MissingParameterError('username');
    }
    if (!data.displayName) {
      throw new MissingParameterError('displayName');
    }
    if (!data.password) {
      throw new MissingParameterError('password');
    }
    if (!data.roles) {
      throw new MissingParameterError('roles');
    }
    if (data.isEnabled === undefined) {
      throw new MissingParameterError('isEnabled');
    }
    if (await this.getForUsernameOrNull(data.username)) {
      throw new Error('Ese nombre de usuario ya está utilizado');
    }

    data.uuid = uuid.v4();
    data.hashedPassword = await this.hashPassword(data.password);
    delete data.password;

    await this.userData.create(data);
  }

  async delete(uuid) {
    if (!uuid) {
      throw new MissingParameterError('uuid');
    }

    const user = await this.getForUuidOrNull(uuid);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await this.userData.deleteByUuid(uuid);
    return { message: 'Usuario eliminado correctamente' };
  }

  async update(uuid, updateData) {
    if (!uuid) {
      throw new MissingParameterError('uuid');
    }

    const user = await this.getForUuidOrNull(uuid);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (updateData.password) {
      updateData.hashedPassword = await this.hashPassword(updateData.password);
      delete updateData.password;
    }

    delete updateData.uuid;

    const updatedUser = await this.userData.updateByUuid(uuid, updateData);
    return updatedUser;
  }
}
