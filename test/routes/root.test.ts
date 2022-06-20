import app from '../../src/index';

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await app.close();
});

describe('guess route', () => {
  it('should return 200 with current date', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toBeTruthy();
  });
});
