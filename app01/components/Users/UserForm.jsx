import PropTypes from 'prop-types';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, CheckBox, StyleSheet } from 'react-native';

export const UserForm = ({
  initialUser = {},
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const roleOptions = ["admin", "user"];
  const [user, setUser] = useState(initialUser);

  const handleRoleChange = (role) => {
    const currentRoles = new Set(user.roles || []);
    if (currentRoles.has(role)) {
      currentRoles.delete(role);
    } else {
      currentRoles.add(role);
    }
    setUser({ ...user, roles: Array.from(currentRoles) });
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>{isEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}</Text>
        <View>
          {!isEdit && (
            <>
              <View style={styles.formGroup}>
                <Text>Nombre de Usuario</Text>
                <TextInput style={styles.input} required={!isEdit} />
              </View>
              <View style={styles.formGroup}>
                <Text>Contraseña</Text>
                <TextInput style={styles.input} secureTextEntry required={!isEdit} />
              </View>
            </>
          )}
          <View style={styles.formGroup}>
            <Text>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              defaultValue={user.displayName || ""}
              required
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Roles</Text>
            {roleOptions.map((role) => (
              <View key={role} style={styles.roleContainer}>
                <CheckBox value={user.roles?.includes(role)} onValueChange={() => handleRoleChange(role)} />
                <Text>{role}</Text>
              </View>
            ))}
          </View>
          <View style={styles.formGroup}>
            <Text>¿Está habilitado?</Text>
            <Switch value={user.isEnabled || false} onValueChange={(value) => setUser({ ...user, isEnabled: value })} />
          </View>
          <View style={styles.formActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit(user)}>
              <Text>{isEdit ? "Guardar Cambios" : "Crear Usuario"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

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

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modal: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  formGroup: { marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5 },
  roleContainer: { flexDirection: 'row', alignItems: 'center' },
  formActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelButton: { padding: 10, backgroundColor: '#ccc', borderRadius: 5 },
  submitButton: { padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }
});