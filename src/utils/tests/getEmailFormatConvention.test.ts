import { getEmailFormatConvention } from '../getEmailFormatConvention';
import { EMAIL_ADDRESS_TYPE } from '../constants';

describe('getEmailFormatConvention', () => {
  test.each([
    { given: 'google.com', expected: EMAIL_ADDRESS_TYPE.FULL_NAME },
    { given: 'babbel.com', expected: EMAIL_ADDRESS_TYPE.SHORT_NAME },
    { given: 'buraksaraloglu.com', expected: EMAIL_ADDRESS_TYPE.FULL_NAME }
  ])('$given should return $expected', ({ given, expected }) => {
    expect(getEmailFormatConvention(given)).toBe(expected);
  });
});
