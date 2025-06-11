import React, { createContext, useState, useContext, useEffect } from 'react';
import StorageService from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadStorage = async () => {
      try {
        const [storedRoles, storedToken] = await Promise.all([
          StorageService.getItem("roles"),
          StorageService.getStringItem("token"),
        ]);

        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }

        if (storedRoles) setRoles(storedRoles);
      } catch (error) {
        console.error("❌ Error al cargar datos del almacenamiento:", error);
      }
    };

    loadStorage();
  }, []);

  const login = async (userData, userToken) => {
    try {
      await Promise.all([
        StorageService.setItem("roles", userData.roles),
        StorageService.setStringItem("token", userToken),
      ]);

      setRoles(userData.roles);
      setToken(userToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        StorageService.removeItem("roles"),
        StorageService.removeItem("token"),
      ]);

      setRoles([]);
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ roles, setRoles, token, setToken, isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);