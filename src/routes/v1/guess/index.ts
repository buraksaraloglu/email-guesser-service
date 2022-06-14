import type { FastifyInstance } from 'fastify';
import { guessSchema, postGuessSchema } from './schema';
import { postGuessHandler } from './handler';

export default async (fastify: FastifyInstance) => {
  fastify.addSchema(guessSchema);
  fastify.post('/', { schema: postGuessSchema }, postGuessHandler);
};
