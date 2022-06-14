import { type RouteHandler } from 'fastify';
import type { Body, postGuessResponse } from './schema';

import { getFirstAndLastName, clearUrl } from '../../../utils/helpers';
import { generateEmailAddress } from '../../../utils/generateEmailAdress';

const invalidRequest = (reply, body) => {
  reply.status(400).send({
    error: body.error
  });
  return;
};

export const postGuessHandler: RouteHandler<{
  Body: Body;
  Reply: postGuessResponse;
}> = async function (req, reply) {
  const { fullName, domainUrl } = req.body;

  const cleanFullName = getFirstAndLastName(fullName);

  if (!cleanFullName) {
    return invalidRequest(reply, { error: 'Invalid fullName' });
  }

  const cleanDomainUrl = clearUrl(domainUrl);

  if (!cleanDomainUrl) {
    return invalidRequest(reply, { error: 'Invalid domainUrl' });
  }

  const [firstName, lastName] = cleanFullName;

  reply.code(200).send({
    email: generateEmailAddress({ firstName, lastName, domain: cleanDomainUrl })
  });
};
