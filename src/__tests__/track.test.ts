import request from 'supertest';
// import tape from 'tape';
import express from 'express';
import trackRouter from '../routes/trackRoutes';
const app = express();

app.use(express.json());

app.use('/api/v1/tracks', trackRouter);

// const payload = {
//   artist: '62dc24cd2d4e0320fd4844f5',
//   title: 'test title',
//   url: 'test url',
//   genre: 'Pop',
//   duration: '4:15',
// };

describe('Create Track route', () => {
  describe('given the user is not logged in', () => {
    test('given the user is not logged in', async () => {
      const res = await request(app).get('/api/v1/tracks');

      expect(res.statusCode).toBe(401);
    });
  });
});
