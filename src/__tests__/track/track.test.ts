import request from 'supertest';
import express from 'express';

import trackRouter from '../../routes/trackRoutes';
import { signToken } from '../../controllers/authController';
import User from '../../models/userModel';
import { DocumentDefinition } from 'mongoose';
import userInterface from '../../interfaces/user.Interface';
import { payload } from '../../test/payloads/track.payloads';
import { user as userPayload } from '../../test/payloads/user.payloads';

const app = express();

app.use(express.json());

app.use('/api/v1/tracks', trackRouter);

describe('Track Test', () => {
  describe('Create And Get Tracks route', () => {
    describe('given the user is not logged in', () => {
      test('should return 401', async () => {
        const res = await request(app).post('/api/v1/tracks');
        const tracks = await request(app).get('/api/v1/tracks');

        expect(res.statusCode).toBe(401);

        expect(tracks.statusCode).toBe(401);
      });
    });

    describe('given the user is logged in', () => {
      jest.setTimeout(5000);
      test('should return 201', async () => {
        const user: DocumentDefinition<userInterface> | any =
          await User.findOne({
            email: 'ced@ced.com',
          });

        const jwt = signToken(user._id);

        const res = await request(app)
          .post('/api/v1/tracks')
          .set('Authorization', `Bearer ${jwt}`)
          .send({ ...payload, artist: user.artist });

        const tracks = await request(app)
          .get('/api/v1/tracks')
          .set('Authorization', `Bearer ${jwt}`);

        expect(res.statusCode).toBe(201);

        expect(tracks.statusCode).toBe(200);
      });
    });
  });

  describe('Edit Track route', () => {
    describe('given the user is not logged in', () => {
      test('should return 401', async () => {
        const res = await request(app).post('/api/v1/tracks');

        expect(res.statusCode).toBe(401);
      });

      describe('given the track does not belong to the logged in user', () => {
        test('should return 201', async () => {
          const user: DocumentDefinition<userInterface> | any =
            await User.findOne({
              email: 'ced@ced.com',
            });

          const jwt = signToken(user._id);

          const res = await request(app)
            .post('/api/v1/tracks')
            .set('Authorization', `Bearer ${jwt}`)
            .send({ ...payload, artist: user.artist });

          const tracks = await request(app)
            .get('/api/v1/tracks')
            .set('Authorization', `Bearer ${jwt}`);

          expect(res.statusCode).toBe(201);

          expect(tracks.statusCode).toBe(200);
        });
      });
    });
  });
});
