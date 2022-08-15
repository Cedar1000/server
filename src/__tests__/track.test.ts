import request from 'supertest';
import mongoose from 'mongoose';
// import tape from 'tape';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import trackRouter from '../routes/trackRoutes';
import { signToken } from '../controllers/authController';

const app = express();
const id = '62dc24cd2d4e0320fd4844f5';

app.use(express.json());

app.use('/api/v1/tracks', trackRouter);

const payload = {
  artist: '62dc24cd2d4e0320fd4844f5',
  title: 'test title',
  url: 'test url',
  genre: 'Pop',
  duration: '4:15',
};

describe('Create Track route', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('given the user is not logged in', () => {
    test('should return 401', async () => {
      const res = await request(app).post('/api/v1/tracks');

      expect(res.statusCode).toBe(401);
    });
  });

  describe('given the user is logged in', () => {
    test('should return 201', async () => {
      const jwt = signToken(id);

      const res = await request(app)
        .post('/api/v1/tracks')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ ...payload, _id: id });

      console.log(res);
      expect(res.statusCode).toBe(201);
    });
  });
});
