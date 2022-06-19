import { getEmailFormatConvention } from './getEmailFormatConvention';
import { EMAIL_ADDRESS_TYPE } from './constants';

export const generateEmailAddress = ({
  firstName,
  lastName,
  companyUrl
}: {
  firstName: string;
  lastName: string;
  companyUrl: string;
}): string => {
  const emailFormatConvention = getEmailFormatConvention(companyUrl);

  if (emailFormatConvention === EMAIL_ADDRESS_TYPE.FULL_NAME) {
    return `${firstName}${lastName}@${companyUrl}`;
  }

  return `${firstName[0]}${lastName}@${companyUrl}`;
};
