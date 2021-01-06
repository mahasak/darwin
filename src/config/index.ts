import { init as initRedis } from './cache';
import { init as initDb } from './db';

const initDependencies = async () => {
  await initRedis();
  await initDb();
};

export { initDependencies };