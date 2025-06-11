import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { Api } from "../services/Api.js";
import TeamList from "../components/Teams/TeamList";

const CreateTeam = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [dt, setDt] = useState('');
  const [jugadores, setJugadores] = useState([{ name: "", position: "" }]);
  const [refreshTeams, setRefreshTeams] = useState(false);

  const handleSubmit = async () => {
    if (!nombre || !dt || jugadores.some(jugador => !jugador.name || !jugador.position)) {
      return Alert.alert("Error", "Todos los campos obligatorios deben ser completados.");
    }
  
    const newTeam = {
      name: nombre,
      description: descripcion,
      manager: dt,
      players: jugadores.map(jugador => ({
        name: jugador.name,
        position: jugador.position,
      })),
    };
  
    try {
      const data = await Api.post('team', { body: newTeam }); // ✅ `Api.post()` ya devuelve JSON
      if (data.message === "Team created successfully") {
        ToastAndroid.show('Equipo cargado correctamente', ToastAndroid.SHORT);
        setNombre('');
        setDescripcion('');
        setDt('');
        setJugadores([{ name: "", position: "" }]);
        setRefreshTeams(prev => !prev);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error al cargar el equipo:', error);
      Alert.alert("Error", "Ocurrió un problema al cargar el equipo. Intente nuevamente.");
    }
  };

  const handleJugadorChange = (index, field, value) => {
    const updatedJugadores = [...jugadores];
    updatedJugadores[index][field] = value;
    setJugadores(updatedJugadores);
  };

  const handleAddJugador = () => {
    setJugadores([...jugadores, { name: "", position: "" }]);
  };

  const handleRemoveJugador = (index) => {
    const updatedJugadores = [...jugadores];
    updatedJugadores.splice(index, 1);
    setJugadores(updatedJugadores);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cargar Equipo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Equipo"
        value={nombre}
        onChangeText={setNombre}
        accessibilityLabel="Ingrese el nombre del equipo"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del Equipo (Opcional)"
        value={descripcion}
        onChangeText={setDescripcion}
        accessibilityLabel="Ingrese la descripción del equipo"
      />
      <TextInput
        style={styles.input}
        placeholder="Director Técnico (DT)"
        value={dt}
        onChangeText={setDt}
        accessibilityLabel="Ingrese el nombre del director técnico"
      />

      <Text style={styles.subTitle}>Jugadores:</Text>
      {jugadores.map((jugador, index) => (
        <View key={index} style={styles.jugadorContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Jugador"
            value={jugador.name}
            onChangeText={(text) => handleJugadorChange(index, 'name', text)}
            accessibilityLabel={`Ingrese el nombre del jugador ${index + 1}`}
          />
          <TextInput
            style={styles.input}
            placeholder="Posición"
            value={jugador.position}
            onChangeText={(text) => handleJugadorChange(index, 'position', text)}
            accessibilityLabel={`Ingrese la posición del jugador ${index + 1}`}
          />
          <TouchableOpacity onPress={() => handleRemoveJugador(index)} style={styles.removeBtn}>
            <Text style={styles.removeBtnText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={handleAddJugador} style={styles.addBtn}>
        <Text style={styles.addBtnText}>Agregar Jugador</Text>
      </TouchableOpacity>

      <Button title="Crear Equipo" onPress={handleSubmit} color="#5E8C6B" />

      <TeamList refreshTeams={refreshTeams} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  jugadorContainer: {
    marginBottom: 15,
  },
  removeBtn: {
    marginTop: 5,
    backgroundColor: "#ff0000",
    padding: 5,
    borderRadius: 5,
  },
  removeBtnText: {
    color: "white",
    textAlign: "center",
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  addBtnText: {
    color: "white",
    fontSize: 16,
  },
});

export default CreateTeam;