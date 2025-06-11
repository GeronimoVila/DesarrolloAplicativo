import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, Modal } from "react-native";
import { Api } from "../services/Api.js";
import UserForm from "../components/Users/UserForm.jsx";
import UserTable from "../components/Users/UserTable.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await Api.get("user");
      setUsers(data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error.message);
      if (error.message.includes("405")) {
        Alert.alert("Método no permitido", "Verificá que el endpoint soporte GET");
      } else {
        Alert.alert("Error", error.message || "Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = () => {
    setEditingUserId(null);
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEdit = (uuid) => {
    setEditingUserId(uuid);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = (uuid) => {
    Alert.alert(
      "¿Eliminar usuario?",
      "Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await Api.post("user/delete", { body: { uuid } });
              fetchUsers();
            } catch (error) {
              Alert.alert("Error eliminando", error.message);
            }
          },
        },
      ]
    );
  };

  const handleSubmit = async (user) => {
    try {
      const formattedUser = {
        ...user,
        username: user.username || "", // ✅ Asegura que `username` siempre se envíe
      };

      if (isEdit) {
        await Api.post("user/update", { body: formattedUser });
      } else {
        await Api.post("user", { body: formattedUser });
      }

      setShowForm(false);
      fetchUsers();
    } catch (error) {
      Alert.alert("Error al guardar", error.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const userToEdit = users.find((u) => u.uuid === editingUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>
      <Button title="Crear Usuario" onPress={handleCreate} />
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* ✅ Formulario superpuesto con `Modal` */}
      <Modal animationType="slide" transparent={true} visible={showForm} onRequestClose={() => setShowForm(false)}>
        <View style={styles.modalOverlay}>
          <UserForm initialUser={userToEdit} isEdit={isEdit} onSubmit={handleSubmit} onCancel={handleCancel} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ Hace que el fondo sea semitransparente
  },
});

export default Users;