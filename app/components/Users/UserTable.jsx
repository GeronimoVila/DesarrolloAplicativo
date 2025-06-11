import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.uuid}
      renderItem={({ item }) => (
        <View style={styles.userRow}>
          {/* ✅ Sección superior con nombre y roles */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.displayName}</Text>
            <View style={styles.rolesContainer}>
              {item.roles.map((role, index) => (
                <Text key={index} style={styles.roleBadge}>{role.toUpperCase()}</Text>
              ))}
            </View>
          </View>

          {/* ✅ Sección inferior con botones */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onEdit(item.uuid)}
              accessibilityLabel={`Modificar usuario ${item.displayName}`}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Modificar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(item.uuid)}
              accessibilityLabel={`Eliminar usuario ${item.displayName}`}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.noUsersText}>No hay usuarios disponibles.</Text>}
    />
  );
};

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

const styles = StyleSheet.create({
  userRow: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 8,
  },
  userInfo: {
    alignItems: 'center', // ✅ Centra el contenido superior
    marginBottom: 10, // ✅ Espaciado entre la info y los botones
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rolesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 5, // ✅ Espacio entre el nombre y los roles
  },
  roleBadge: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around', // ✅ Mejor distribución de los botones
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noUsersText: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default UserTable;