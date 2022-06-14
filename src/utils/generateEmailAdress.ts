import { getEmailFormatConvention } from './getEmailFormatConvention';
import { EMAIL_ADDRESS_TYPE } from './constants';

export const generateEmailAddress = ({
  firstName,
  lastName,
  domain
}: {
  firstName: string;
  lastName: string;
  domain: string;
}): string => {
  const emailFormatConvention = getEmailFormatConvention(domain);

  if (emailFormatConvention === EMAIL_ADDRESS_TYPE.FULL_NAME) {
    return `${firstName}${lastName}@${domain}`;
  }

  return `${firstName[0]}${lastName}@${domain}`;
};
