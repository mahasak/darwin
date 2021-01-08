import http from 'http';
import express from 'express';
import 'express-async-errors';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
import { initDependencies } from './config';
import { logger } from './config/logger';
import wds from './utils/wds'
import path from 'path';
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
const isDevelopment = process.env.NODE_ENV === 'production' ? false : true;


async function start() {

  //await initDependencies();
  //applyMiddleware(middleware, app);
  //applyRoutes(routes, app);
  

  if (isDevelopment) {
    //const wds = require('./wds');
    wds(app);
  } else {
    app.use(express.static(path.resolve(__dirname, 'public')));
  }

  applyMiddleware(errorHandlers, app);
  
  server.listen(PORT, () =>
    logger.info({
      message: `Server is running http://localhost:${PORT}...`,
    }),
  );
}

start();