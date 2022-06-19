import cases from 'jest-in-case';

import { getEmailFormatConvention } from '../getEmailFormatConvention';
import { EMAIL_ADDRESS_TYPE } from '../constants';

function casify(obj) {
  return Object.entries(obj).map(([name, companyUrl]) => ({
    name: `${companyUrl} - ${name}`,
    companyUrl
  }));
}

cases(
  'getEmailFormatConvention: full name',
  ({ companyUrl }) => {
    expect(getEmailFormatConvention(companyUrl)).toBe(EMAIL_ADDRESS_TYPE.FULL_NAME);
  },
  casify({
    'valid full name - 1': 'google.com',
    'valid full name - 2': 'linkedin.com',
    'default fullname': 'buraksaraloglu.com'
  })
);

cases(
  'getEmailFormatConvention: short name',
  ({ companyUrl }) => {
    expect(getEmailFormatConvention(companyUrl)).toBe(EMAIL_ADDRESS_TYPE.SHORT_NAME);
  },
  casify({
    'valid short name': 'babbel.com'
  })
);
