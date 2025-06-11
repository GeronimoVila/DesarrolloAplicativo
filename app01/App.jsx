import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen.jsx';
import Users from './screens/Users.jsx';
import CreateTeam from './screens/CreateTeam.jsx';
import Home from './screens/Home.jsx';
import { NavBar } from './components/Global/NavBar.jsx';
import { NotFound } from './components/Global/404Error.jsx';
import CreateTournament  from './screens/CreateTournament.jsx';
import TournamentDetail from './screens/TournamentDetails.jsx';
import PositionsTable from './screens/PositionTable.jsx';
import StorageService from './services/storageService.js';

const Stack = createStackNavigator();

function App() {
  const [roles, setRoles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    Promise.all([
      StorageService.getItem("roles"),
      StorageService.getStringItem("token")
    ])
      .then(([storedRoles, token]) => {
        if (token) setIsAuthenticated(true);
      });
  }, []);

  return (
    <NavigationContainer>
      <NavBar roles={roles}/>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setRoles={setRoles} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="CreateTeam" component={CreateTeam} />
        <Stack.Screen name="CreateTournament" component={CreateTournament} />
        <Stack.Screen name="Positions" component={PositionsTable} />
        <Stack.Screen name="TournamentDetails" component={TournamentDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;