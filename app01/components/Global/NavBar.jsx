import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import StorageService from "../../services/storageService.js";

const items = [
  { name: "Inicio", path: "Home", roles: [] },
  { name: "Iniciar Sesion", path: "Login", roles: [] },
  { name: "Usuarios", path: "Users", roles: ["admin"] },
  { name: "Crear Equipo", path: "CreateTeam", roles: ["admin"] },
  { name: "Crear Torneo", path: "CreateTournament", roles: ["admin"] },
  { name: "Tabla de Posiciones", path: "Positions", roles: ["admin", "user"] },
];

export const NavBar = ({roles}) => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);


  useEffect(() => {
    const filtered = items.filter((item) => {

      // Si el usuario está autenticado y el item es "Iniciar Sesion", no se muestra
      if (isAuthenticated && item.name === "Iniciar Sesion") return false;

      // Si no hay roles, solo mostramos los elementos sin roles
      if (!roles.length) return item.roles.length === 0;

      // Si hay roles, mostramos los elementos que coinciden con los roles del usuario
      return item.roles.length === 0 || item.roles.some((role) => roles.includes(role));
    });

    setFilteredItems(filtered);
  }, [roles, isAuthenticated]);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate("Home")}>
        <Image source={require("../../assets/Logo.png")} style={styles.logoImage} />
        <Text style={styles.logoText}>FSB</Text>
      </TouchableOpacity>
      
      <View style={styles.nav}>
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.path)}
          >
            <Text style={styles.navText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {isAuthenticated && (
        <TouchableOpacity
          onPress={() => {
            StorageService.removeItem("token");
            StorageService.removeItem("roles");
            setRoles([]);
            setIsAuthenticated(false);
            navigation.navigate("Home");
          }}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    gap: 15,
  },
  navItem: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: '#007BFF',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});