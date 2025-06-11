import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {
  // Guarda un valor en AsyncStorage
  setItem: async (key, value) => {
    try {
      if (typeof value !== "string") {
        value = JSON.stringify(value);  // Convertir a string si no lo es
      }
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error guardando en AsyncStorage: ${error}`);
    }
  },

  getStringItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;  // Parsear el valor obtenido
    } catch (error) {
      console.error(`Error obteniendo de AsyncStorage: ${error}`);
      return serializedValue;
    }
  },

  // Obtiene un valor de AsyncStorage
  getItem: async (key) => {
    try {
      const serializedValue = await AsyncStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;  // Parsear el valor obtenido
    } catch (error) {
      console.error(`Error obteniendo de AsyncStorage: ${error}`);
      return serializedValue;
    }
  },

  // Elimina un valor de AsyncStorage
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error eliminando de AsyncStorage: ${error}`);
    }
  },

  // Limpia todo el AsyncStorage
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`Error limpiando AsyncStorage: ${error}`);
    }
  },
};

export default StorageService;