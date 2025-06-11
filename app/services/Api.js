import { URL_BASE } from "../config/URLs.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Api = {
  defaultHeaders: {
    "Content-Type": "application/json",
  },

  fetch: async (service, options = {}) => {
    options.headers = { ...Api.defaultHeaders, ...(options.headers || {}) };

    try {
      let token = await AsyncStorage.getItem("token");

      console.log("🔑 Token obtenido de AsyncStorage:", token);

      if (!token || isTokenExpired(token)) {
        console.log("🔄 Token expirado, obteniendo uno nuevo...");
        const newTokenResponse = await fetch(`${URL_BASE}/generateToken`);
        const newTokenData = await newTokenResponse.json();

        console.log("📩 Nuevo token recibido:", newTokenData.authorizationToken);

        if (!newTokenResponse.ok || !newTokenData.authorizationToken) {
          throw new Error("❌ Error al obtener un nuevo token.");
        }

        token = newTokenData.authorizationToken;
        await AsyncStorage.setItem("token", token);
      }

      options.headers["Authorization"] = `Bearer ${token}`;
      console.log("📩 Headers enviados:", JSON.stringify(options.headers));
    } catch (error) {
      console.error("❌ Error obteniendo token:", error.message);
    }

    if (options.body && typeof options.body !== "string") {
      options.body = JSON.stringify(options.body);
    }

    const url = `${URL_BASE}/${service}`;
    console.log("📡 Enviando solicitud a:", url);
    console.log("📩 Opciones de fetch:", JSON.stringify(options));

    try {
      const response = await fetch(url, options);
      console.log("🔄 Estado de la respuesta:", response.status);

      if (response.status === 204) {
        console.log("⚠️ Respuesta vacía (204 No Content)");
        return {}; // ✅ Manejo de respuestas vacías
      }

      const text = await response.text();
      console.log("📜 Respuesta en texto:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("❌ Error parseando JSON:", text);
        data = { error: "Error desconocido" };
      }

      if (!response.ok || data.error) {
        console.error("🚫 Error HTTP:", response.status, data.error);
        throw new Error(data.error || `Error HTTP ${response.status}`);
      }

      console.log("✅ Respuesta procesada correctamente:", data);
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

  delete: async (uuid) => { // ✅ Removiendo `team/` extra en la URL
    return Api.fetch(`team/delete/${uuid}`, { method: "POST" });
  },
};

// **Función para verificar si el token ha expirado**
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("🔎 Expiración del token:", payload.exp, "Actual:", Date.now());

    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error("❌ Error al analizar el token:", error);
    return true; // Si hay un error, asumimos que el token es inválido
  }
};