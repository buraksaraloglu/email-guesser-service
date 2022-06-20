import { clearUrl } from '../helpers';

describe('clearUrl', () => {
  const expectedTruthyUrl = 'babbel.com';
  const expectedFalsyUrl = null;

  test.each([
    {
      given: 'babbel.com',
      expected: expectedTruthyUrl
    },
    {
      given: 'https://babbel.com',
      expected: expectedTruthyUrl
    },
    {
      given: 'www.babbel.com',
      expected: expectedTruthyUrl
    },
    {
      given: 'https://www.babbel.com',
      expected: expectedTruthyUrl
    },
    {
      given: 'https://babbel.com/test?test=test',
      expected: expectedTruthyUrl
    },
    {
      given: 'https://babbel.com/test/test',
      expected: expectedTruthyUrl
    }
  ])('$given should return $expected', ({ given, expected }) => {
    expect(clearUrl(given)).toStrictEqual(expected);
  });

  test.each([
    {
      given: 'ttt...com',
      expected: expectedFalsyUrl
    },
    {
      given: 'http://.com',
      expected: expectedFalsyUrl
    },
    {
      given: 'babbel 👋',
      expected: expectedFalsyUrl
    }
  ])('$given should return $expected', ({ given, expected }) => {
    expect(clearUrl(given)).toStrictEqual(expected);
  });
});
