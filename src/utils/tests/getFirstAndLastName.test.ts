import { getFirstAndLastName } from '../helpers';

describe('getFirstAndLastName', () => {
  test.each([
    {
      given: 'burak saraloglu',
      expected: ['burak', 'saraloglu']
    },
    {
      given: 'burak test saraloglu',
      expected: ['burak', 'saraloglu']
    },
    {
      given: 'burak       saraloglu',
      expected: ['burak', 'saraloglu']
    }
  ])('$given should return $expected', ({ given, expected }) => {
    expect(getFirstAndLastName(given)).toStrictEqual(expected);
  });

  test.each([
    {
      given: '',
      expected: null
    },
    {
      given: 'burak',
      expected: null
    },
    {
      given: 'null',
      expected: null
    },
    {
      given: '123',
      expected: null
    },
    {
      given: 'Object.keys({test: () => console.log("pwned)}).forEach(key => key())',
      expected: null
    },
    {
      given: '                   ',
      expected: null
    }
  ])('$given should return $expected', ({ given, expected }) => {
    expect(getFirstAndLastName(given)).toStrictEqual(expected);
  });
});
