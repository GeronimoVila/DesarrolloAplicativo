import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#007BFF',
  secondary: '#ccc',
  error: 'red',
  background: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  form: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },

  input: {
    width: width * 0.9,
    height: 45,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },

  button: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: colors.background,
    fontSize: 16,
  },

  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  passwordToggle: {
    marginBottom: 20,
  },

  passwordToggleText: {
    textAlign: 'center',
    color: colors.primary,
  },
});

export default styles;