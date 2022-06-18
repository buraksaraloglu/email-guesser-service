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
  const cleanDomainUrl = clearUrl(domainUrl);

  if (!cleanFullName) {
    return invalidRequest(reply, { error: 'Invalid fullName' });
  }

  if (!cleanDomainUrl) {
    return invalidRequest(reply, { error: 'Invalid domainUrl' });
  }

  if (cleanDomainUrl === 'invalid.com') {
    return invalidRequest(reply, { error: `Invalid company URL: ${cleanDomainUrl}` });
  }

  const [firstName, lastName] = cleanFullName;
  const email = generateEmailAddress({ firstName, lastName, domain: cleanDomainUrl });

  reply.code(200).send({ email });
};
