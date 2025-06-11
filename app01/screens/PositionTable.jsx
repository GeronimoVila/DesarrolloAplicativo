import { useEffect, useState } from "react";
import { View, Text, Picker, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Api } from "../services/Api";

export const TournamentsWithPositions = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTournaments = async () => {
    try {
      const response = await Api.get("tournament");
      const data = await response.json();
      if (response.ok) {
        setTournaments(data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Error al obtener torneos:", err);
    }
  };

  const fetchPositions = async (tournamentId) => {
    setLoading(true);
    try {
      const response = await Api.post(`get-positions/${tournamentId}`);
      const data = await response.json();
      if (response.ok) {
        const sortedPositions = data.sort((a, b) => {
          if (b.wins !== a.wins) {
            return b.wins - a.wins;
          }
          return a.losses - b.losses;
        });
        setPositions(sortedPositions);
        setSelectedTournament(tournamentId);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
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
  cell: { flex: 1, textAlign: "center" }
});

export default TournamentsWithPositions;