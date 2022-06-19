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
  const { fullName, companyUrl } = req.body;
  const cleanFullName = getFirstAndLastName(fullName);
  const cleancompanyUrl = clearUrl(companyUrl);

  if (!cleanFullName) {
    return invalidRequest(reply, { error: 'Invalid fullName' });
  }

  if (!cleancompanyUrl) {
    return invalidRequest(reply, { error: 'Invalid companyUrl' });
  }

  if (cleancompanyUrl === 'invalid.com') {
    return invalidRequest(reply, { error: `Invalid company URL: ${cleancompanyUrl}` });
  }

  const [firstName, lastName] = cleanFullName;
  const email = generateEmailAddress({ firstName, lastName, companyUrl: cleancompanyUrl });

  reply.code(200).send({ email });
};
