import React, { useEffect } from "react";
import { View, Text } from "react-native";

const URL_BASE = "http://10.200.1.249:4001/api";

const ApiTest = () => {
  useEffect(() => {
    fetch(`${URL_BASE}/status`)
      .then((res) => res.json())
      .then((data) => console.log("✅ Respuesta del backend:", data))
      .catch((error) =>
        console.error("❌ Error al conectar con el backend:", error)
      );
  }, []);

  return (
    <View>
      <Text>Probando conexión con el backend...</Text>
    </View>
  );
};

export default ApiTest;