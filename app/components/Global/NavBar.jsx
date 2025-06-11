import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StorageService from "../../services/storageService.js";
import { useAuth } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";

const items = [
  { name: "Inicio", path: "Home", roles: [] },
  { name: "Iniciar Sesion", path: "Login", roles: [] },
  { name: "Usuarios", path: "Users", roles: ["admin"] },
  { name: "Crear Equipo", path: "CreateTeam", roles: ["admin"] },
  { name: "Crear Torneo", path: "CreateTournament", roles: ["admin"] },
  { name: "Tabla de Posiciones", path: "Positions", roles: ["admin", "user"] },
];

const NavBar = () => {
  const navigation = useNavigation();
  const { roles, setRoles, isAuthenticated, setIsAuthenticated } = useAuth();
  const [filteredItems, setFilteredItems] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const filtered = items.filter((item) => {
      if (isAuthenticated && item.name === "Iniciar Sesion") return false;
      if (!isAuthenticated) return item.roles.length === 0;
      return item.roles.length === 0 || item.roles.some((role) => roles.includes(role));
    });
    setFilteredItems(filtered);
  }, [roles, isAuthenticated]);

  const handleLogout = () => {
    StorageService.removeItem("token");
    StorageService.removeItem("roles");
    setRoles([]);
    setIsAuthenticated(false);
    setMenuVisible(false);
    navigation.navigate("Home");
  };

  const handleNavigate = (path) => {
    setMenuVisible(false);
    navigation.navigate(path);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate("Home")}>
        <Image source={require("../../assets/Logo.png")} style={styles.logoImage} />
        <Text style={styles.logoText}>FSB</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
        <Icon name="menu" size={30} color="#007BFF" />
      </TouchableOpacity>

      <Modal visible={menuVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        />
        <View style={styles.menu}>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigate(item.path)}
              >
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          {isAuthenticated && (
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={[styles.menuText, { color: "#FF5733" }]}>Cerrar Sesión</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menu: {
    position: "absolute",
    top: 70,
    right: 0,
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: "#007BFF",
  },
});