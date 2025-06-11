import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen.jsx";
import Users from "./screens/Users.jsx";
import CreateTeam from "./screens/CreateTeam.jsx";
import Home from "./screens/Home.jsx";
import NavBar from "./components/Global/NavBar.jsx";
import CreateTournament from "./screens/CreateTournament.jsx";
import PositionsTable from "./screens/PositionTable.jsx";
import TournamentDetails from "./screens/TournamentDetails.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";

const Stack = createStackNavigator();

function MainApp() {
  const { roles } = useAuth();

  return (
    <>
      <NavBar roles={roles} />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="CreateTeam" component={CreateTeam} />
        <Stack.Screen name="CreateTournament" component={CreateTournament} />
        <Stack.Screen name="Positions" component={PositionsTable} />
        <Stack.Screen name="TournamentDetails" component={TournamentDetails} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </AuthProvider>
  );
}