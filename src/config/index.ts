import { init as initRedis } from './cache';

const initDependencies = async () => {
  await initRedis();
};

export { initDependencies };