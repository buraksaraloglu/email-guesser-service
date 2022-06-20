import app from '../../src/index';

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await app.close();
});

describe('guess route', () => {
  const createRequest = ({ fullName, companyUrl }: { fullName: string; companyUrl: string }) => ({
    method: 'POST' as const,
    url: '/v1/guess',
    body: {
      fullName,
      companyUrl
    }
  });

  test.each([
    {
      request: createRequest({ fullName: 'Nina Simons', companyUrl: 'babbel.com' }),
      expected: 'nsimons@babbel.com'
    },
    {
      request: createRequest({ fullName: 'Priya Kuber', companyUrl: 'linkedin.com' }),
      expected: 'priyakuber@linkedin.com'
    },
    {
      request: createRequest({ fullName: 'Nina Simons', companyUrl: 'babbel.com' }),
      expected: 'nsimons@babbel.com'
    },
    {
      request: createRequest({ fullName: 'Nina Simons', companyUrl: 'babbel.com' }),
      expected: 'nsimons@babbel.com'
    }
  ])(
    '($request.body.fullName, $request.body.companyUrl) should return $expected',
    async ({ request, expected }) => {
      const response = await app.inject(request);
      expect(response.statusCode).toBe(200);

      const { email } = JSON.parse(response.payload);
      expect(email).toEqual(expected);
    }
  );

  test.each([
    {
      request: createRequest({ fullName: 'Burak', companyUrl: 'babbel.com' }),
      expected: 'Invalid fullName'
    },
    {
      request: createRequest({ fullName: '', companyUrl: 'babbel.com' }),
      expected: 'Invalid fullName'
    },
    {
      request: createRequest({ fullName: '123', companyUrl: 'babbel.com' }),
      expected: 'Invalid fullName'
    },
    {
      request: createRequest({ fullName: '123 123', companyUrl: 'babbel.com' }),
      expected: 'Invalid fullName'
    },
    {
      request: createRequest({ fullName: 'Burak Saraloglu', companyUrl: 'babbel' }),
      expected: 'Invalid companyUrl'
    },
    {
      request: createRequest({ fullName: 'Burak Saraloglu', companyUrl: '' }),
      expected: 'Invalid companyUrl'
    },
    {
      request: createRequest({ fullName: 'Burak Saraloglu', companyUrl: '.com' }),
      expected: 'Invalid companyUrl'
    },
    {
      request: createRequest({ fullName: 'Burak Saraloglu', companyUrl: 'http://.com' }),
      expected: 'Invalid companyUrl'
    }
  ])(
    '($request.body.fullName, $request.body.companyUrl) should return error: $expected',
    async ({ request, expected }) => {
      const response = await app.inject(request);
      expect(response.statusCode).toBe(400);

      const { error } = JSON.parse(response.payload);
      expect(error).toEqual(expected);
    }
  );
});
