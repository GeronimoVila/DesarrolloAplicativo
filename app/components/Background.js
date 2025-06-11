import { View, ImageBackground } from 'react-native';
import styles from '../lib/styles.js'; // Asegura que la ruta sea correcta

export default function Background({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}