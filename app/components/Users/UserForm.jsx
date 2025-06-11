import PropTypes from 'prop-types';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';

export const UserForm = ({
  initialUser = {},
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const roleOptions = ['admin', 'user'];
  const [user, setUser] = useState({
    username: "",
    password: "",
    displayName: "",
    roles: [],
    isEnabled: true,
    ...initialUser,
  });
  const [error, setError] = useState(null);

  const handleRoleChange = (role) => {
    setUser({
      ...user,
      roles: user.roles.includes(role) ? user.roles.filter(r => r !== role) : [...user.roles, role],
    });
  };

  const handleSubmit = () => {
    if (!user.username) {
      setError('El nombre de usuario es obligatorio.');
      return;
    }
    if (!user.password) {
      setError('La contraseña es obligatoria.');
      return;
    }
    if (!user.displayName) {
      setError('El nombre completo es obligatorio.');
      return;
    }
    if (!user.roles || user.roles.length === 0) {
      setError('Debes asignar al menos un rol al usuario.');
      return;
    }

    setError(null);
    onSubmit(user);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.modalTitle}>
            {isEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
          </Text>

          <View style={styles.formGroup}>
            <Text>Nombre de Usuario</Text>
            <TextInput
              style={styles.input}
              value={user.username || ""}
              onChangeText={(text) => setUser({ ...user, username: text })}
              placeholder="Ingrese el nombre de usuario"
              accessibilityLabel="Ingrese el nombre de usuario"
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Contraseña</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={user.password || ""}
              onChangeText={(text) => setUser({ ...user, password: text })}
              placeholder="Ingrese la contraseña"
              accessibilityLabel="Ingrese la contraseña del usuario"
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              value={user.displayName || ""}
              onChangeText={(text) => setUser({ ...user, displayName: text })}
              placeholder="Ingrese el nombre completo"
              accessibilityLabel="Ingrese el nombre completo del usuario"
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Roles</Text>
            {roleOptions.map((role) => (
              <View key={role} style={styles.roleContainer}>
                <Text>{role}</Text>
                <Switch
                  value={user.roles?.includes(role)}
                  onValueChange={() => handleRoleChange(role)}
                  accessibilityLabel={`Seleccionar rol ${role}`}
                />
              </View>
            ))}
          </View>

          <View style={styles.formGroup}>
            <Text>¿Está habilitado?</Text>
            <Switch
              value={user.isEnabled || false}
              onValueChange={(value) => setUser({ ...user, isEnabled: value })}
              accessibilityRole="switch"
              accessibilityLabel="¿Está habilitado?"
            />
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.formActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel} accessibilityLabel="Cancelar operación">
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} accessibilityLabel="Enviar datos de usuario">
              <Text>{isEdit ? 'Guardar Cambios' : 'Crear Usuario'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

UserForm.propTypes = {
  initialUser: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    displayName: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    isEnabled: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: 300,
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default UserForm;