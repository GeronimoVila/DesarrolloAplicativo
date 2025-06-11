import PropTypes from 'prop-types';
import "../../styles/UserTable.css";

const getRoleColor = (role) => {
  switch (role) {
    case "admin":
      return "role-admin";
    case "user":
      return "role-user";
    case "guest":
      return "role-guest";
    default:
      return "role-default";
  }
};

export const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Roles</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.uuid}>
            <td>{user.displayName}</td>
            <td>
              <div className="roles-container">
                {user.roles.map((role, index) => (
                  <span key={index} className={`role-badge ${getRoleColor(role)}`}>
                    {role.toUpperCase()}
                  </span>
                ))}
              </div>
            </td>
            <td className="actions">
              <button
                className="btn edit-btn"
                onClick={() => onEdit(user.uuid)}
              >
                Modificar
              </button>
              <button
                className="btn delete-btn"
                onClick={() => onDelete(user.uuid)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// PropTypes validation
UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};