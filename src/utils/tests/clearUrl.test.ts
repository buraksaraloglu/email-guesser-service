import { clearUrl } from '../helpers';

interface ICase {
  given: string;
  expected: string;
}

const casify = async (title: string, cases: ICase[]) => {
  if (cases.length === 0) {
    return;
  }

  it(title, () => {
    for (const { given, expected } of cases) {
      expect(clearUrl(given)).toStrictEqual(expected);
    }
  });
};

// truthy cases
casify('should return clean url', [
  {
    given: 'babel.com',
    expected: 'babel.com'
  },
  {
    given: 'https://babbel.com',
    expected: 'babbel.com'
  },
  {
    given: 'www.babbel.com',
    expected: 'babbel.com'
  },
  {
    given: 'https://www.babbel.com',
    expected: 'babbel.com'
  },
  {
    given: 'https://babbel.com/test?test=test',
    expected: 'babbel.com'
  },
  {
    given: 'https://babbel.com/test/test',
    expected: 'babbel.com'
  }
]);

// falsy cases
casify('should return empty string if url is not valid', [
  {
    given: 'ttt...com',
    expected: ''
  },
  {
    given: 'http://.com',
    expected: ''
  },
  {
    given: 'babbel 👋',
    expected: ''
  }
]);
