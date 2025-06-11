import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const NotFound = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoHome = () => {
    navigation.navigate('Home'); // Asegúrate de que 'Home' es correcto en tu Stack
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle" size={32} color="#4A90E2" />
        </View>
        <Text style={styles.title}>Página no encontrada</Text>
        <Text style={styles.subtitle}>
          Inténtalo más tarde o regresa a la página principal
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonBack} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={20} color="#333" />
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHome} onPress={handleGoHome}>
            <Text style={styles.buttonHomeText}>Ir a la página principal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: '#E6F0FF',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonBack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  buttonHome: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonHomeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});