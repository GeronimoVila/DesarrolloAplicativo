import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Background from '../components/Background';
import FormComponent from '../components/partial/FormComponent';
import styles from '../lib/styles';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ setRoles, setIsAuthenticated }) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      setRoles,
      setIsAuthenticated,
    });
  }, [navigation, setRoles, setIsAuthenticated]);

  return (
    <Background>
      <View style={styles.background}>
        <FormComponent setRoles={setRoles} setIsAuthenticated={setIsAuthenticated} />
      </View>
    </Background>
  );
}