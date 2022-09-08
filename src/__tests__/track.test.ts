import request from 'supertest';
import mongoose from 'mongoose';
// import tape from 'tape';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import trackRouter from '../routes/trackRoutes';
import { signToken } from '../controllers/authController';
import User from '../models/userModel';
import { DocumentDefinition } from 'mongoose';
import userInterface from '../interfaces/user.Interface';

const app = express();

app.use(express.json());

app.use('/api/v1/tracks', trackRouter);

const payload = {
  title: 'test title',
  url: 'test url',
  genre: 'Pop',
  duration: '4:15',
  cover: 'test cover',
};

describe('Create Track route', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());

    await User.create({
      name: 'Ced',
      email: 'ced@ced.com',
      avatar: 'avatar',
      type: 'artist',
      gender: 'male',
      active: true,
      password: '$2a$12$qg9ss8zwymhhfNf5UdE4SODPT3ZXfMFi038XfM05TvxXjkU/3LEsa',
      passwordConfirm:
        '$2a$12$qg9ss8zwymhhfNf5UdE4SODPT3ZXfMFi038XfM05TvxXjkU/3LEsa',
      __v: 0,
    });
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
    jest.setTimeout(5000);
    test('should return 201', async () => {
      const user: DocumentDefinition<userInterface> | any = await User.findOne({
        email: 'ced@ced.com',
      });

      const jwt = signToken(user._id);

      const res = await request(app)
        .post('/api/v1/tracks')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ ...payload, artist: user.artist });

      expect(res.statusCode).toBe(201);
    });
  });
});
