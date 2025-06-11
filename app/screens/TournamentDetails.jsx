import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert, FlatList, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Api } from "../services/Api";

const TournamentDetails = () => {
  const route = useRoute();
  const { tournamentUuid } = route.params;
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [fetchTournaments, setFetchTournaments] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTournamentDetails = async () => {
    setLoading(true);
    try {
      const data = await Api.post(`tournament/${tournamentUuid}`); // ✅ Eliminado `.json()`

      const formattedMatches = data.matches.map((match) => {
        if (match.result) {
          const [resultA, resultB] = match.result.split("-").map(Number);
          return { ...match, resultA, resultB };
        }
        return match;
      });

      setTournament(data);
      setMatches(formattedMatches);
    } catch (error) {
      console.error("Error al obtener el torneo:", error);
      Alert.alert("Error", "No se pudieron obtener los detalles del torneo. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournamentDetails();
  }, [tournamentUuid, fetchTournaments]);

  const handleResultChange = (index, team, value) => {
    const updatedMatches = [...matches];
    updatedMatches[index][team] = value;
    setMatches(updatedMatches);
  };

  const handleSaveResults = async () => {
    const formattedMatches = matches.map((match) => {
      const resultA = parseInt(match.resultA, 10);
      const resultB = parseInt(match.resultB, 10);

      if (isNaN(resultA) || isNaN(resultB)) {
        return { _id: match._id, teamA: match.teamA.uuid, teamB: match.teamB.uuid, result: "", winner: "" };
      }

      const result = `${resultA}-${resultB}`;
      let winner = "Empate";
      if (resultA > resultB) winner = match.teamA.uuid;
      else if (resultA < resultB) winner = match.teamB.uuid;

      return { _id: match._id, teamA: match.teamA.uuid, teamB: match.teamB.uuid, result, winner };
    });

    try {
      const data = await Api.post(`tournament/${tournamentUuid}/save-results`, { body: { matches: formattedMatches } });

      Alert.alert("Éxito", "Resultados guardados correctamente.");
      setFetchTournaments(!fetchTournaments);
    } catch (error) {
      console.error("Error al guardar los resultados:", error);
      Alert.alert("Error", "Ocurrió un problema al guardar los resultados. Intenta nuevamente.");
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" accessibilityLabel="Cargando detalles del torneo" />;
  if (!tournament) return <Text style={styles.errorText}>No se encontraron detalles del torneo.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados del Torneo: {tournament.name}</Text>
      <FlatList
        data={matches}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No hay partidos disponibles para este torneo.</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.matchCard}>
            <Text style={styles.matchText}>
              <Text style={styles.bold}>{item.teamA.name}</Text> vs <Text style={styles.bold}>{item.teamB.name}</Text>
            </Text>
            <View style={styles.resultContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={item.resultA?.toString() || ""}
                onChangeText={(value) => handleResultChange(index, "resultA", value)}
                editable={!item.result}
                accessibilityLabel={`Resultado del equipo ${item.teamA.name}`}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={item.resultB?.toString() || ""}
                onChangeText={(value) => handleResultChange(index, "resultB", value)}
                editable={!item.result}
                accessibilityLabel={`Resultado del equipo ${item.teamB.name}`}
              />
            </View>
          </View>
        )}
      />
      <Button title="Guardar Resultados" onPress={handleSaveResults} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  matchCard: { padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 5, marginBottom: 10 },
  matchText: { fontSize: 16, marginBottom: 5 },
  bold: { fontWeight: "bold" },
  resultContainer: { flexDirection: "row", justifyContent: "space-between" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 5, width: 50, textAlign: "center" },
  errorText: { textAlign: "center", color: "red", fontSize: 16, marginTop: 20 },
  emptyMessage: { textAlign: "center", color: "#777", fontSize: 14, marginTop: 10 },
});

export default TournamentDetails;