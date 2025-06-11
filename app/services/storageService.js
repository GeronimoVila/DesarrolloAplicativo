import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {
  // Guarda un valor en AsyncStorage
  setItem: async (key, value) => {
    try {
      const data = value !== null ? JSON.stringify(value) : null;
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.error(`❌ Error guardando en AsyncStorage (${key}):`, error);
    }
  },

  // Obtiene un valor como string de AsyncStorage
  getStringItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return typeof value === "string" ? value : null;
    } catch (error) {
      console.error(`❌ Error obteniendo string de AsyncStorage (${key}):`, error);
      return null;
    }
  },

  // Obtiene un valor y lo parsea desde JSON
  getItem: async (key) => {
    try {
      const serializedValue = await AsyncStorage.getItem(key);
      if (!serializedValue) return null; // Si no hay datos, devolver null
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error(`❌ Error obteniendo de AsyncStorage (${key}):`, error);
      return null;
    }
  },

  // Elimina un valor de AsyncStorage
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`✅ Eliminado correctamente: ${key}`);
    } catch (error) {
      console.error(`❌ Error eliminando (${key}):`, error);
    }
  },

  // Limpia todo el AsyncStorage
  clear: async () => {
    try {
      await AsyncStorage.clear();
      console.log(`✅ AsyncStorage limpiado correctamente.`);
    } catch (error) {
      console.error(`❌ Error limpiando AsyncStorage:`, error);
    }
  },
};

export default StorageService;