import defaultEmails from '../shared/emailConventions';

import { clearUrl, getFirstAndLastName } from './helpers';
import { EMAIL_ADDRESS_TYPE, IEmailAddress } from './constants';

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

export const getEmailFormatConvention = (companyUrl: IEmailAddress['url']): string => {
  if (conventions.has(companyUrl)) {
    return conventions.get(companyUrl);
  }

  Object.keys(defaultEmails).forEach((fullname) => {
    const [firstName] = getFirstAndLastName(fullname);

    const email = defaultEmails[fullname];
    const cleanCompanyUrl = clearUrl(email.split('@')[1]);

    if (!cleanCompanyUrl || conventions.has(cleanCompanyUrl)) {
      return;
    }

    return conventions.set(cleanCompanyUrl, getConvention(firstName, email));
  });

  if (conventions.has(companyUrl)) {
    return conventions.get(companyUrl);
  }

  // ? How should we handle company urls that are not in the default emails
  return EMAIL_ADDRESS_TYPE.FULL_NAME;
};
