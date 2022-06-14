import fp from 'fastify-plugin';
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

import { version } from '../../package.json';

export default fp<FastifyDynamicSwaggerOptions>(async (fastify) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Email Guesser API',
        description: 'A simple API to guess the email address of a given name',
        version
      },
      servers: [
        {
          url: 'http://localhost'
        }
      ]
    },
    hideUntagged: true,
    exposeRoute: true
  });
});
