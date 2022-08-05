import request from 'supertest';
import app from '../app';

describe('This is a test for track', () => {
  it('given the user is not logged in', async () => {
    const { statusCode } = await request(app).post('/api/v1/tracks');
    expect(statusCode).toBe(401);
  });
});
