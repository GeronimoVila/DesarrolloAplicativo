import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Api } from "../services/Api";

export const TournamentsList = () => {
  const [tournaments, setTournaments] = useState([]);
  const navigation = useNavigation();

  const fetchTournaments = async () => {
    try {
      const response = await Api.get("tournament");
      const data = await response.json();

      if (response.ok) {
        setTournaments(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener los torneos:", error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Torneos Disponibles</Text>
      {tournaments.length === 0 ? (
        <Text style={styles.noTournaments}>No hay torneos disponibles.</Text>
      ) : (
        <FlatList
          data={tournaments}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tournamentItem}
              onPress={() => navigation.navigate("TournamentDetail", { tournamentId: item.uuid })}
            >
              <Text style={styles.tournamentName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noTournaments: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  tournamentItem: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TournamentsList;