import { ForbiddenError } from './forbidden_error.js';

export function checkPermission(req, role) {
  const roles = req.user?.roles;
  if (!roles || !roles.includes(role)) {
    throw new ForbiddenError();
  }
}