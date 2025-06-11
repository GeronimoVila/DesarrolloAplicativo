import { URL_BASE } from "../config/URLs.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Api = {
  defaultHeaders: {
    'Content-Type': 'application/json',
  },

  fetch: async (service, options = {}) => {
    options.headers = { ...Api.defaultHeaders, ...(options.headers || {}) };

    const token = await AsyncStorage.getItem('token');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (options.body && typeof options.body !== "string") {
      options.body = JSON.stringify(options.body);
    }

    const url = `${URL_BASE}/${service}`;
    console.log("📡 Enviando solicitud a:", url);
    console.log("📩 Opciones de fetch:", JSON.stringify(options));

    try {
      const response = await fetch(url, { ...options, mode: 'cors' });
      console.log("🔄 Estado de la respuesta:", response.status);

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}`);
      }

      console.log("✅ Respuesta recibida:", data);
      return data;
    } catch (error) {
      console.error("❌ Error en la solicitud:", error.message);
      throw error;
    }
  },

  get: async (service, options) => {
    return Api.fetch(service, { ...options, method: "GET" });
  },

  post: async (service, options) => {
    return Api.fetch(service, { ...options, method: "POST" });
  },
};