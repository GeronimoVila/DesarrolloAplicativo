import { View, ImageBackground } from 'react-native';
import styles from '../lib/styles';

export default function Background({ children }) {
  const imageUri = require('../assets/Logo.png');

  return (
    <View style={styles.container}>
      {imageUri ? (
        <ImageBackground
        style={styles.image}
        source={imageUri}
      >
        {children}
      </ImageBackground>      
      ) : (
        <View style={styles.placeholder}>
          {children}
        </View>
      )}
    </View>
  );
}
