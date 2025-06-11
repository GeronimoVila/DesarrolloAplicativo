import { useEffect, useState } from "react";
import { Api } from "../../services/Api.js";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import PropTypes from 'prop-types';

const TeamList = ({ refreshTeams }) => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const data = await Api.get('team'); // ✅ `Api.get()` ya devuelve JSON
      setTeams(data);
    } catch (error) {
      console.error("Error al obtener los equipos:", error);
      Alert.alert("Error", "Ocurrió un problema al obtener la lista de equipos.");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [refreshTeams]);

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este equipo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await Api.delete(id); // ✅ solo pasar el UUID
              ToastAndroid.show("Equipo eliminado correctamente", ToastAndroid.SHORT);
              fetchTeams();
            } catch (error) {
              console.error("Error al eliminar el equipo:", error);
              Alert.alert("Error", "Ocurrió un problema al eliminar el equipo. Intente nuevamente.");
            }
          },
        },
      ]
    );
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.teamList}>
        {teams.length === 0 ? (
          <Text style={styles.noTeamsMessage}>
            No hay equipos cargados.
          </Text>
        ) : (
          teams.map((team) => (
            <View key={team.uuid} style={styles.teamCard}>
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.teamDescription}>
                <Text style={styles.bold}>Descripción:</Text> {team.description || "Sin descripción"}
              </Text>
              <Text style={styles.teamManager}>
                <Text style={styles.bold}>Director Técnico (DT):</Text> {team.manager || "Sin DT"}
              </Text>
              <View>
                <Text style={styles.playersTitle}>Jugadores:</Text>
                {team.players.map((player, index) => (
                  <Text key={index} style={styles.playerItem}>
                    {player.name} - {player.position}
                  </Text>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => handleDelete(team.uuid)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

TeamList.propTypes = {
  refreshTeams: PropTypes.bool.isRequired, // Cambié a boolean
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  teamList: {
    flexDirection: "column",
  },
  teamCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  teamName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  teamDescription: {
    marginTop: 5,
    fontSize: 14,
  },
  teamManager: {
    marginTop: 5,
    fontSize: 14,
  },
  playersTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  playerItem: {
    fontSize: 14,
    marginLeft: 10,
  },
  deleteButton: {
    marginTop: 15,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  noTeamsMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default TeamList;