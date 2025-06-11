import express from 'express';
import cors from 'cors';
import { Dependency } from './libs/dependency.js';
import { InvalidAuthorizationSchemaError } from './libs/invalid_authorization_schema_error.js';
import { InvalidAuthorizationTokenError } from './libs/invalid_authorization_token_error.js';
import jwt from 'jsonwebtoken';

export function configureMiddlewares(app) {
  const corsOptions = {
    origin: (origin, callback) => {
      // Si no hay origen (como en peticiones internas), o cualquier origen es permitido
      if (!origin) {
        return callback(null, true);
      }
      return callback(null, true); // Permitir cualquier origen
    },
    credentials: true, // Permitir cookies/credenciales
    optionsSuccessStatus: 200, // Para compatibilidad con navegadores antiguos
  };

  app.use(cors(corsOptions));

  app.use(function (req, res, next) {
    const origin = req.headers.origin;
    if (origin) {
      res.header("Access-Control-Allow-Origin", origin); // Establecer el origen de manera dinámica
    }
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true); // Permitir cookies/credenciales
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
  });

  app.use("/", express.json());

  const router = express.Router();
  app.use("/api", router);

  router.use(authorizationMiddleware);

  app.use(errorHandler); // Manejo global de errores

  return router;
}

function authorizationMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    next();
    return;
  }

  const auth = req.headers.authorization;
  if (auth.substr(0, 7).toLowerCase() !== "bearer ") {
    throw new InvalidAuthorizationSchemaError();
  }

  const token = auth.substr(7).trim();

  if (!token) {
    throw new InvalidAuthorizationTokenError();
  }

  const conf = Dependency.get("conf");
  const user = jwt.verify(token, conf.jwtPassword);

  if (!user) {
    throw new InvalidAuthorizationTokenError();
  }
  if (!user.isEnabled) {
    throw new InvalidAuthorizationTokenError();
  }

  req.user = user;

  next();
}

function errorHandler(err, req, res, next) {
  if (!(err instanceof Error)) {
    res.status(500).send(err);
    next();
    return;
  }

  const statusCodes = {
    MissingParameterError: 400,
    ConflictError: 409,
    InvalidCredentialsError: 401,
  };

  const name = err.constructor.name;
  const status = statusCodes[name] ?? 500;

  res.status(status).send({
    error: name,
    message: err.message,
  });
}
