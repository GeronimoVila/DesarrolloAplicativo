import { Dependency } from '../../libs/dependency.js';
import { checkPermission } from '../../libs/check_permision.js';

export class UserController {
  constructor() {
    this.userService = Dependency.get('userService');
  }

  async get(req, res) {
    checkPermission(req, 'admin');
    const uuid = req.query.uuid;
    if (uuid) {
      const user = await this.userService.getForUuidOrNull(uuid);
      res.send(user);
    }
    else {
      const userList = await this.userService.getList();
      res.send(userList); 
    }
  }

  async post(req, res) {
    checkPermission(req, 'admin');
    
    try {
      await this.userService.create(req.body);
      res.status(200).send({
        message: 'User created successfully',
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
      const result = await this.userService.delete(uuid);
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
      const updatedUser = await this.userService.update(uuid, updateData);
      res.status(200).send({
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error',
        message: err.message,
      });
    }
  }
}
