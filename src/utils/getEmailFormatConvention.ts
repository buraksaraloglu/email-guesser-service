import defaultEmails from '../shared/emailConventions';

import { clearUrl, getFirstAndLastName } from './helpers';
import { EMAIL_ADDRESS_TYPE } from './constants';

// An inmemory cache for email conventions
// This is a temporary solution until we have a persistent storage
const conventions = new Map<string, EMAIL_ADDRESS_TYPE>();

const getConvention = (firstName: string, email: string) => {
  const isFullNameConvention = email.substring(0, firstName.length) === firstName;

  if (isFullNameConvention) {
    return EMAIL_ADDRESS_TYPE.FULL_NAME;
  }

  return EMAIL_ADDRESS_TYPE.SHORT_NAME;
};

export const getEmailFormatConvention = (domain: string): string => {
  if (conventions.has(domain)) {
    return conventions.get(domain);
  }

  Object.keys(defaultEmails).forEach((fullname) => {
    const [firstName] = getFirstAndLastName(fullname);

    if (!firstName) {
      return;
    }

    const email = defaultEmails[fullname];
    const cleanDomain = clearUrl(email.split('@')[1]);

    if (!cleanDomain || conventions.has(cleanDomain)) {
      return;
    }

    return conventions.set(cleanDomain, getConvention(firstName, email));
  });

  if (conventions.has(domain)) {
    return conventions.get(domain);
  }

  // ? How should we handle domains that are not in the default emails
  return EMAIL_ADDRESS_TYPE.FULL_NAME;
};
