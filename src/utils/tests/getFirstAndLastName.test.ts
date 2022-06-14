import { getFirstAndLastName } from '../helpers';

interface ICase {
  given: string;
  expected: [string, string] | null;
}

const casify = async (title: string, cases: ICase[]) => {
  if (cases.length === 0) {
    return;
  }

  it(title, () => {
    for (const { given, expected } of cases) {
      expect(getFirstAndLastName(given)).toStrictEqual(expected);
    }
  });
};

// truthy cases
casify('should return first and last name', [
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
]);

// falsy cases
casify('should return null if full name is not valid', [
  {
    given: '',
    expected: null
  },
  {
    given: 'burak',
    expected: null
  }
]);
