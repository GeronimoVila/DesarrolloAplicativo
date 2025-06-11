import { useEffect, useState } from "react";
import { View, Text, Button, Modal, TextInput, CheckBox, StyleSheet, FlatList, Alert, ToastAndroid } from 'react-native';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/userServices.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = () => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = () => {
    const newUser = {
      username: selectedUser.username,
      password: selectedUser.password,
      displayName: selectedUser.displayName,
      roles: selectedUser.roles,
      isEnabled: selectedUser.isEnabled,
    };

    createUser(newUser)
      .then(() => {
        setShowModal(false);
        loadUsers();
      })
      .catch((error) => console.error(error.message));
  };

  const handleDeleteUser = (uuid) => {
    deleteUser(uuid)
      .then(() => {
        ToastAndroid.show('Usuario eliminado correctamente', ToastAndroid.SHORT);
        loadUsers();
      })
      .catch((error) => console.error('Error al eliminar el usuario:', error.message));
  };

  const handleEditUser = (uuid) => {
    const user = users.find((u) => u.uuid === uuid);
    if (user) {
      setSelectedUser(user);
      setShowEditModal(true);
    }
  };

  const handleUpdateUser = () => {
    const updatedUser = {
      ...selectedUser,
      displayName: selectedUser.displayName,
      roles: selectedUser.roles,
      isEnabled: selectedUser.isEnabled,
    };

    updateUser(updatedUser)
      .then(() => {
        setShowEditModal(false);
        loadUsers();
      })
      .catch((error) => console.error('Error al actualizar el usuario:', error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Button onPress={() => setShowModal(true)} title="Crear nuevo usuario" color="#5E8C6B" />

      <FlatList
        data={users}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.username}</Text>
            <Button title="Editar" onPress={() => handleEditUser(item.uuid)} />
            <Button title="Eliminar" onPress={() => handleDeleteUser(item.uuid)} />
          </View>
        )}
      />

      {/* Modal para crear usuario */}
      {showModal && (
        <Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              onChangeText={(text) => setSelectedUser({ ...selectedUser, username: text })}
            />
            <Button title="Crear Usuario" onPress={handleCreateUser} />
            <Button title="Cancelar" onPress={() => setShowModal(false)} />
          </View>
        </Modal>
      ) || null}

      {/* Modal para editar usuario */}
      {showEditModal && selectedUser && (
        <Modal animationType="slide" transparent={true} visible={showEditModal} onRequestClose={() => setShowEditModal(false)}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={selectedUser.displayName}
              placeholder="Nombre de usuario"
              onChangeText={(text) => setSelectedUser({ ...selectedUser, displayName: text })}
            />
            <Button title="Actualizar Usuario" onPress={handleUpdateUser} />
            <Button title="Cancelar" onPress={() => setShowEditModal(false)} />
          </View>
        </Modal>
      ) || null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
});

export default Users;