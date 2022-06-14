import { join } from 'path';
import * as fastify from 'fastify';
import autoLoad from '@fastify/autoload';

const app = fastify.default({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        destination: 1,
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        ignore: 'pid,hostname'
      }
    }
  }
});

app.register(autoLoad, {
  dir: join(__dirname, 'plugins')
});

app.register(autoLoad, {
  dir: join(__dirname, 'routes')
});

const start = async () => {
  try {
    await app.listen({ port: 3400 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
