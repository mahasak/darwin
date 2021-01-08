import http from 'http';
import express from 'express';
import 'express-async-errors';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
import { initDependencies } from './config';
import { logger } from './config/logger';

process.on('uncaughtException', (e) => {
  logger.error({
    message: `uncaughtException`,
    extra: e,
  });
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  logger.error({
    message: `unhandledRejection`,
    extra: e,
  });
  process.exit(1);
});
const app = express();
const { PORT = 3000 } = process.env;
const server = http.createServer(app);
async function start() {

  await initDependencies();
  applyMiddleware(middleware, app);
  applyRoutes(routes, app);
  applyMiddleware(errorHandlers, app);


  
  server.listen(PORT, () =>
    logger.info({
      message: `Server is running http://localhost:${PORT}...`,
    }),
  );
}

start();