import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Contenedor principal para alinear los elementos en la pantalla
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Añadido para dar espacio alrededor
  },

  // Fondo de la imagen
  background: {
    width: '100%',
    height: '100%',
  },

  // Estilos para el formulario
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo ligeramente translúcido
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Para añadir sombra en dispositivos Android
    alignItems: 'center',
  },

  // Estilo para los campos de entrada
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },

  // Estilo para el botón
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  // Texto dentro del botón
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  // Estilo para el texto del error
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },

  // Título de la pantalla de login
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Estilo para el enlace de "Mostrar/Ocultar Contraseña"
  passwordToggle: {
    marginBottom: 20,
  },

  // Estilo para el texto del enlace de mostrar/ocultar contraseña
  passwordToggleText: {
    textAlign: 'center',
    color: '#007BFF',
  },
});

export default styles;