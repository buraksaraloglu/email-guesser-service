import app from '../../src/index';

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await app.close();
});

describe('guess route', () => {
  it('/guess -> responds with generated short name email', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/guess',
      payload: {
        fullName: 'Nina Simons',
        companyUrl: 'babbel.com'
      }
    });

    expect(response.statusCode).toBe(200);

    const { email } = JSON.parse(response.payload);
    expect(email).toEqual('nsimons@babbel.com');
  });

  it('/guess -> responds with generated full name email', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/guess',
      payload: {
        fullName: 'Priya Kuber',
        companyUrl: 'linkedin.com'
      }
    });

    expect(response.statusCode).toBe(200);

    const { email } = JSON.parse(response.payload);
    expect(email).toEqual('priyakuber@linkedin.com');
  });

  it('/guess -> responds with 400 status code with invalid full name error', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/guess',
      payload: {
        fullName: 'Burak',
        companyUrl: 'babbel.com'
      }
    });

    expect(response.statusCode).toBe(400);
    const { error } = JSON.parse(response.payload);
    expect(error).toEqual('Invalid fullName');
  });

  it('/guess -> responds with 400 status code with invalid companyUrl error', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/guess',
      payload: {
        fullName: 'Burak Saraloglu',
        companyUrl: 'babbel'
      }
    });

    expect(response.statusCode).toBe(400);
    const { error } = JSON.parse(response.payload);
    expect(error).toEqual('Invalid companyUrl');
  });
});
