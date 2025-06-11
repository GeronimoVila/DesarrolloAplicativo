import { Api } from "../services/Api.js";

// Función para obtener la lista de usuarios
export const fetchUsers = async () => {
  try {
    const response = await Api.get("user");
    if (!response.ok) {
      throw new Error("Error al obtener la lista de usuarios");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
    throw error;
  }
};

// Función para crear un usuario
export const createUser = async (newUser) => {
  try {
    const response = await Api.post("user", { body: newUser });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Función para actualizar un usuario
export const updateUser = async (updatedUser) => {
  try {
    const response = await Api.post("user/update", { body: updatedUser });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUser = async (uuid) => {
  try {
    const response = await Api.post("user/delete", { body: { uuid } });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};
