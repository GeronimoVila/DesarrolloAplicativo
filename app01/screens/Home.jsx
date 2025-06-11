import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textCenter}>
        <Text style={styles.title}>¡Bienvenido a la Federación Sanjuanina de Básquet!</Text>
        <Text style={styles.description}>
          La Federación de Básquet se dedica a promover y desarrollar el deporte del básquetbol en todas sus formas. Nos enorgullecemos de apoyar a jugadores, entrenadores y aficionados, brindando recursos, organizando torneos y facilitando el acceso a entrenamientos.
        </Text>
        <View style={styles.line} />
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Crea Tu Equipo</Text>
          <Text style={styles.cardDescription}>
            Puedes crear y gestionar tus propios equipos de básquet. Añade jugadores, define roles y mantén toda la información de tu equipo organizada en un solo lugar.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Crea Tu Torneo</Text>
          <Text style={styles.cardDescription}>
            Organiza torneos personalizados y agrega tus equipos participantes. Define el formato del torneo y sigue el progreso de cada partido.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Carga los Resultados</Text>
          <Text style={styles.cardDescription}>
            Registra los resultados de los partidos y visualiza la tabla de posiciones de los torneos. Mantén a todos informados sobre el rendimiento de los equipos y el avance del torneo.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textCenter: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  line: {
    width: '80%',
    height: 2,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  cardsContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});