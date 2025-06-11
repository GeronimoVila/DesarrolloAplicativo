// Inyectar polyfill para ReadableStream
import { ReadableStream } from 'web-streams-polyfill/ponyfill';
global.ReadableStream = ReadableStream;

// Agregar compatibilidad adicional para Fetch
import fetch from 'cross-fetch';
global.fetch = fetch;

// Manejar conflictos con el módulo undici (si es requerido)
import process from 'process'; // Polyfill para process en entornos web
global.process = process;

// Evitar manipular directamente _resolveFilename (puede causar errores)
try {
  const Module = require('module');
  const originalResolveFilename = Module._resolveFilename;
  Module._resolveFilename = (request, parent, isMain) => {
    if (request === 'undici') throw new Error('Blocked undici module');
    return originalResolveFilename(request, parent, isMain);
  };
} catch (error) {
  console.error("Error configurando el módulo: ", error);
}

// Incluir configuración estándar del proyecto
import 'react-native-gesture-handler';

// Importar el archivo principal de la app
import App from './App.jsx';

// Actualizar para usar createRoot en React 18
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root'); // Busca el contenedor donde se renderizará la app
const root = createRoot(container); // Inicializa createRoot en lugar de ReactDOM.render
root.render(<App />);