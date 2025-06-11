import PropTypes from 'prop-types';
import "../../styles/UserForm.css";

export const UserForm = ({
  initialUser = {},
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const roleOptions = ["admin", "user"];

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    const currentRoles = new Set(initialUser.roles || []);

    if (checked && value !== "") {
      currentRoles.add(value);
    } else {
      currentRoles.delete(value);
    }

    initialUser.roles = Array.from(currentRoles).filter(Boolean);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="modal-title">
          {isEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </h2>
        <form onSubmit={onSubmit}>
          {!isEdit && (
            <>
              <div className="form-group">
                <label htmlFor="username">Nombre de Usuario</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="form-control"
                  required={!isEdit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                  required={!isEdit}
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="displayName">Nombre Completo</label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              defaultValue={initialUser.displayName || ""}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Roles</label>
            <div className="roles-container">
              {roleOptions.map((role) => (
                <label key={role} className="role-label">
                  <input
                    type="checkbox"
                    name="roles"
                    value={role}
                    defaultChecked={initialUser.roles?.includes(role)}
                    onChange={handleRoleChange}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="isEnabled">¿Está habilitado?</label>
            <input
              type="checkbox"
              id="isEnabled"
              name="isEnabled"
              defaultChecked={initialUser.isEnabled || false}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn cancel-btn" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn submit-btn">
              {isEdit ? "Guardar Cambios" : "Crear Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
UserForm.propTypes = {
  initialUser: PropTypes.shape({
    displayName: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    isEnabled: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
};