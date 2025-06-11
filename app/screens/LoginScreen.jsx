import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Background from "../components/Background";
import FormComponent from "../components/partial/FormComponent";
import styles from "../lib/styles";
import { useAuth } from "../context/AuthContext";

const URL_BASE = "http://10.200.1.249:4001/api";

export default function LoginScreen() {
  const [token, setLocalToken] = useState(null);
  const { setRoles, setIsAuthenticated, setToken } = useAuth();

  useEffect(() => {
    // Obtener nuevo token antes de mostrar el formulario
    fetch(`${URL_BASE}/generateToken`)
      .then((res) => res.json())
      .then((data) => {
        if (data.authorizationToken) {
          console.log("🔄 Nuevo token recibido:", data.authorizationToken);
          setLocalToken(data.authorizationToken);
        } else {
          console.error("❌ Error: No se recibió un token válido.");
        }
      })
      .catch((error) =>
        console.error("❌ Error al obtener nuevo token:", error)
      );
  }, []);

  return (
    <Background>
      <View style={styles.background}>
        <FormComponent
          token={token}
          setRoles={setRoles}
          setIsAuthenticated={setIsAuthenticated}
          setToken={setToken}
          accessibilityLabel="Formulario de inicio de sesión"
        />
      </View>
    </Background>
  );
}
