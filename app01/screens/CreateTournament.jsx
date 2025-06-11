import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Api } from "../services/Api";

const CreateTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await Api.get("team");
        const data = await response.json();
        if (response.ok) {
          setTeams(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error al obtener los equipos:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async () => {
    if (selectedTeams.length < 2) {
      Alert.alert("Error", "Debes seleccionar al menos dos equipos.");
      return;
    }

    const newTournament = { name, description, teams: selectedTeams };

    try {
      const response = await Api.post("tournament", { body: newTournament });
      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Torneo creado con éxito");
        handleGenerateMatches(data.uuid);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al crear el torneo:", error);
      Alert.alert("Error", "No se pudo crear el torneo.");
    }
  };

  const handleGenerateMatches = async (tournamentUuid) => {
    try {
      const response = await Api.post("tournament/generate-matches", { body: { uuid: tournamentUuid } });
      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Partidos generados con éxito");
        navigation.navigate("TournamentDetails", { tournamentUuid });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al generar los partidos:", error);
      Alert.alert("Error", "No se pudieron generar los partidos.");
    }
  };

  const handleTeamSelection = (teamUuid) => {
    setSelectedTeams((prev) =>
      prev.includes(teamUuid) ? prev.filter((uuid) => uuid !== teamUuid) : [...prev, teamUuid]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Torneo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Torneo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción del Torneo (Opcional)"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Selecciona los equipos:</Text>

      {teams.length === 0 ? (
        <Text style={styles.noTeams}>No hay equipos disponibles.</Text>
      ) : (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.teamItem, selectedTeams.includes(item.uuid) && styles.selectedTeam]}
              onPress={() => handleTeamSelection(item.uuid)}
            >
              <Text style={styles.teamName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Torneo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTournament;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  noTeams: { textAlign: "center", color: "#777" },
  teamItem: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 5 },
  selectedTeam: { backgroundColor: "#ddd" },
  teamName: { fontSize: 16 },
  button: { backgroundColor: "#007bff", padding: 12, borderRadius: 5, alignItems: "center", marginTop: 15 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
