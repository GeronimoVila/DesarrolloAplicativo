import express from 'express';
import { configureRoutes } from './routes.js';
import { configureSwagger } from './swagger.js';
import { configureDependencies } from './dependencies.js';
import { configureMiddlewares } from './middlewares.js';
import { Dependency } from './libs/dependency.js';
import mongoose from 'mongoose';

configureDependencies();

const conf = Dependency.get('conf');

mongoose.connect(conf.db);

const app = express();
const router = configureMiddlewares(app);
configureRoutes(router);
configureSwagger(router);

app.get("/api/status", (req, res) => {
  res.json({ status: "OK", message: "El backend está corriendo correctamente" });
});

// Nueva ruta para generar un token manualmente
app.get("/api/generateToken", async (req, res) => {
  try {
    const loginService = Dependency.get("loginService");
    const user = await loginService.userService.getForUsernameOrNull("Admin"); // ← Cambia "Admin" si necesitas otro usuario
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const newToken = loginService.generateManualToken(user);
    res.json(newToken);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.all('*', (req, res) => {
  res.status(405).send('Metodo no permitido.');
});

app.listen(conf.port, () => {
  console.log(`El servidor está aceptando conexiones en el puerto ${conf.port}`);
});