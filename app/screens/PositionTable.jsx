import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Api } from "../services/Api";

const TournamentsWithPositions = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTournaments = async () => {
    try {
      const data = await Api.get("tournament"); // ✅ `Api.get()` ya devuelve JSON
      setTournaments(data);
    } catch (err) {
      console.error("Error al obtener torneos:", err);
      Alert.alert("Error", "No se pudieron obtener los torneos. Intente nuevamente.");
    }
  };

  const fetchPositions = async (tournamentId) => {
    if (!tournamentId) {
      Alert.alert("Advertencia", "Por favor, selecciona un torneo válido.");
      return;
    }
  
    setLoading(true);
    try {
      const data = await Api.post(`get-positions/${tournamentId}`); // ✅ Eliminado `response`
  
      if (!data || data.error) {
        throw new Error(data?.message || "Error desconocido");
      }
  
      const sortedPositions = data.sort((a, b) => {
        if (b.wins !== a.wins) {
          return b.wins - a.wins;
        }
        return a.losses - b.losses;
      });
  
      setPositions(sortedPositions);
      setSelectedTournament(tournamentId);
    } catch (err) {
      console.error("Error al obtener posiciones:", err);
      Alert.alert("Error", "No se pudieron obtener las posiciones. Intente nuevamente.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Torneos</Text>

      <Picker
        selectedValue={selectedTournament}
        style={styles.picker}
        onValueChange={(itemValue) => fetchPositions(itemValue)}
        accessibilityLabel="Selecciona un torneo para ver posiciones"
      >
        <Picker.Item label="Selecciona un torneo" value={null} />
        {tournaments.map((tournament) => (
          <Picker.Item key={tournament.uuid} label={tournament.name} value={tournament.uuid} />
        ))}
      </Picker>

      {selectedTournament && (
        <>
          <Text style={styles.subtitle}>
            Tabla de Posiciones - {tournaments.find(t => t.uuid === selectedTournament)?.name}
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.error}>Error: {error}</Text>
          ) : (
            <FlatList
              data={positions}
              keyExtractor={(item) => item.team}
              ListEmptyComponent={<Text style={styles.emptyMessage}>No hay posiciones disponibles.</Text>}
              renderItem={({ item, index }) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{index + 1}</Text>
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={styles.cell}>{item.wins}</Text>
                  <Text style={styles.cell}>{item.losses}</Text>
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  picker: { height: 50, marginBottom: 15 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
  emptyMessage: { textAlign: "center", color: "#777", marginTop: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  cell: { flex: 1, textAlign: "center" },
});

export default TournamentsWithPositions;