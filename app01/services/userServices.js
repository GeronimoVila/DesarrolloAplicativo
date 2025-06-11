import { URL_BASE } from '../config/URLs';

// Obtener la lista de usuarios
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${URL_BASE}/user`);
    if (!response.ok) {
      throw new Error('Error al obtener la lista de usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
    throw error;
  }
};

// Crear un usuario
export const createUser = async (newUser) => {
  try {
    const response = await fetch(`${URL_BASE}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al crear el usuario');
    }
    return data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUser = async (updatedUser) => {
  try {
    const response = await fetch(`${URL_BASE}/user/update`, {
      method: 'PUT', // Cambiado de POST a PUT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar el usuario');
    }
    return data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (uuid) => {
  try {
    const response = await fetch(`${URL_BASE}/user/delete`, {
      method: 'DELETE', // Cambiado de POST a DELETE
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar el usuario');
    }
    return data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};