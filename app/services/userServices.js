import { URL_BASE } from '../config/URLs';
import { Api } from "../services/Api.js";

console.log("🔎 Probando acceso a Api:", Api);

// ✅ Obtener la lista de usuarios
export const fetchUsers = async () => {
  try {
    const response = await Api.get("user");
    console.log("✅ Datos recibidos en fetchUsers:", response);

    if (response.error) {
      throw new Error(response.error || "Error al obtener la lista de usuarios.");
    }

    if (!Array.isArray(response)) {
      throw new Error("La respuesta de la API no es una lista de usuarios.");
    }

    return response;
  } catch (error) {
    console.error("❌ Error en fetchUsers:", error.message);
    throw error;
  }
};

// ✅ Crear un usuario
export const createUser = async (newUser) => {
  try {
    console.log("📤 Enviando solicitud para crear usuario:", newUser);

    const data = await Api.post("user", { body: newUser }); // ✅ Ya devuelve el JSON
    console.log("✅ Respuesta procesada correctamente:", data);

    if (!data.message || !data.message.includes("successfully")) {
      throw new Error(data.message || "Error desconocido en la creación de usuario.");
    }

    return data;
  } catch (error) {
    console.error("❌ Error al crear usuario:", error.message);
    throw error;
  }
};

// ✅ Actualizar un usuario
export const updateUser = async (updatedUser) => {
  try {
    console.log("📤 Enviando solicitud para actualizar usuario:", updatedUser);

    const response = await Api.post("user/update", { body: updatedUser });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario.");
    }

    const data = await response.json(); // ✅ Usamos `json()` en lugar de `text()`
    console.log("✅ Usuario actualizado correctamente:", data);

    return data;
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error.message);
    throw error;
  }
};

// ✅ Eliminar un usuario
export const deleteUser = async (uuid) => {
  try {
    console.log("📤 Enviando solicitud para eliminar usuario:", uuid);

    const data = await Api.post("user/delete", { body: { uuid } });
    console.log("✅ Usuario eliminado correctamente:", data);

    return data;
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error.message);
    throw error;
  }
};