import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StorageService from "../../services/storageService.js";
import Logo from "../../assets/icons/Logo.png";
import "../../styles/NavBar.css";

const items = [
  { name: "Inicio", path: "/", roles: [] },
  { name: "Iniciar Sesion", path: "/login", roles: [] },
  { name: "Usuarios", path: "/users", roles: ["admin"] },
  { name: "Crear Equipo", path: "/create-team", roles: ["admin"] },
  { name: "Crear Torneo", path: "/create-tournament", roles: ["admin"] },
  { name: "Tabla de Posiciones", path: "/positions", roles: ["admin", "user"] },
];

export const NavBar = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedRoles = StorageService.getItem("roles");
    const token = StorageService.getItem("token");

    if (storedRoles) setRoles(storedRoles);
    if (token) setIsAuthenticated(true);
  }, [location]);

  useEffect(() => {
    const filtered = items.filter((item) => {
      if (isAuthenticated && item.name === "Iniciar Sesion") return false;
      if (!roles.length) return item.roles.length === 0;
      return item.roles.length === 0 || item.roles.some((role) => roles.includes(role));
    });

    setFilteredItems(filtered);
  }, [roles, isAuthenticated, location]);

  return (
    <header className="navbar-header">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={Logo} alt="logo" />
        <span>Federacion Sanjuanina de Basquet</span>
      </div>
      <nav className="navbar-nav">
        {filteredItems.map((item) => (
          <Link key={item.name} className="navbar-link" to={item.path}>
            {item.name}
          </Link>
        ))}
      </nav>
      {isAuthenticated && (
        <button
          onClick={() => {
            StorageService.removeItem("token");
            StorageService.removeItem("roles");
            setRoles([]);
            setIsAuthenticated(false);
            navigate("/");
          }}
          className="navbar-button"
        >
          Cerrar Sesión
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      )}
    </header>
  );
};