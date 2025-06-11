import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Api } from '../../services/Api.js'; 
import StorageService from '../../services/storageService.js';
import { useNavigation } from '@react-navigation/native';

export const FormComponent = ({ setRoles, setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    const body = { username, password };
  

    try {
      const res = await Api.post('login', { body });

      if (res.error) {
        setError(res.message || res.error);
      } else {
        Api.defaultHeaders.Authorization = `Bearer ${res.authorizationToken}`;
        StorageService.setItem('token', res.authorizationToken);
        StorageService.setItem('roles', res.roles);
        StorageService.setItem('isAuthenticated', res.isAuthenticated);
        navigation.navigate('Home'); // Verificar que esto se esté llamando correctamente

        setRoles(res.roles);
        setIsAuthenticated(res.isAuthenticated);
      }
    } catch (err) {
      console.error('❌ Error en la solicitud:', err);
      setError(err.message || String(err));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Ingrese sus datos</Text>

      <View style={styles.inputContainer}>
        <Text>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={handleClickShowPassword} style={styles.icon}>
          <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Ingresar</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});

export default FormComponent;