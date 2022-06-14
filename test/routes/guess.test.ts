import app from '../../src/index';

describe('guess route', () => {
  it('/guess -> responds with generated short name email', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/guess',
      payload: {
        fullName: 'Burak Saraloglu',
        domainUrl: 'babbel.com'
      }
    });

    expect(response.statusCode).toBe(200);

    const { email } = JSON.parse(response.payload);
    expect(email).toEqual('bsaraloglu@babbel.com');
  });

  it('/guess -> responds with generated full name email', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/guess',
      payload: {
        fullName: 'Burak Saraloglu',
        domainUrl: 'google.com'
      }
    });

    expect(response.statusCode).toBe(200);

    const { email } = JSON.parse(response.payload);
    expect(email).toEqual('buraksaraloglu@google.com');
  });

  it('/guess -> responds with 400 status code with invalid full name error', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/guess',
      payload: {
        fullName: 'Burak',
        domainUrl: 'babbel.com'
      }
    });

    expect(response.statusCode).toBe(400);
    const { error } = JSON.parse(response.payload);
    expect(error).toEqual('Invalid fullName');
  });

  it('/guess -> responds with 400 status code with invalid domainUrl error', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/v1/guess',
      payload: {
        fullName: 'Burak Saraloglu',
        domainUrl: 'babbel'
      }
    });

    expect(response.statusCode).toBe(400);
    const { error } = JSON.parse(response.payload);
    expect(error).toEqual('Invalid domainUrl');
  });
});
