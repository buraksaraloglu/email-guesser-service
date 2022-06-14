import type { FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

// Shared Schema
export const guessSchema = {
  $id: 'guess',
  type: 'object',
  properties: {
    fullName: { type: 'string' },
    domainUrl: { type: 'string' }
  },
  required: ['fullName', 'domainUrl']
} as const;

// Body Schema
export type Body = FromSchema<typeof guessSchema>;

export const postGuessResponseSchema = {
  $id: 'guess',
  type: 'object',
  properties: {
    email: { type: 'string' }
  }
} as const;

export type postGuessResponse = FromSchema<typeof postGuessResponseSchema>;

/* Post */
export const postGuessSchema: FastifySchema = {
  tags: ['Guess'],
  description: 'Guess an email address from a full name and domain',
  body: guessSchema,
  response: {
    200: {
      description: 'The guessed email address',
      type: 'object',
      properties: {
        email: { type: 'string' }
      }
    }
  }
};
