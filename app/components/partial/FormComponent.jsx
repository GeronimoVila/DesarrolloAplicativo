import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Api } from '../../services/Api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const FormComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { setRoles, setIsAuthenticated, token, setToken } = useAuth();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Por favor complete todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const res = await Api.post('login', {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: { username, password }
      });

      if (res.error) {
        setError(res.message || res.error);
      } else {
        console.log("🔄 Guardando nuevo token:", res.authorizationToken);

        await AsyncStorage.setItem("token", res.authorizationToken);
        await AsyncStorage.setItem("roles", JSON.stringify(res.roles));

        if (res.isAuthenticated !== undefined) {
          await AsyncStorage.setItem("isAuthenticated", String(res.isAuthenticated));
        } else {
          console.warn("⚠️ `isAuthenticated` no está definido en la respuesta del backend.");
        }

        Api.defaultHeaders.Authorization = `Bearer ${res.authorizationToken}`;

        // Actualizamos el contexto
        setToken(res.authorizationToken);
        setRoles(res.roles);
        setIsAuthenticated(res.isAuthenticated);

        navigation.navigate('Home');
      }
    } catch (err) {
      console.error('❌ Error en la solicitud:', err);
      Alert.alert("Error", "Ocurrió un error al iniciar sesión.");
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Ingrese sus datos para continuar</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              value={username}
              onChangeText={setUsername}
              accessibilityLabel="Ingrese su nombre de usuario"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              accessibilityLabel="Ingrese su contraseña"
            />
            <TouchableOpacity onPress={handleClickShowPassword} style={styles.icon}>
              <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#444" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} accessibilityLabel="Presione para iniciar sesión">
            <Text style={styles.submitText}>Ingresar</Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fondo más limpio
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default FormComponent;