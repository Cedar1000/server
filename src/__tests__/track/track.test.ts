import request from 'supertest';
import express from 'express';

import trackRouter from '../../routes/trackRoutes';
import Track from '../../models/trackModel';

import { payload } from '../../test/payloads/track.payloads';
import getJwt from '../../uitils/getMockJWT';
import { verify } from 'jsonwebtoken';
import { promisify } from 'util';

const app = express();
let jwt: string;

beforeAll(async () => (jwt = await getJwt()));

app.use(express.json());

app.use('/api/v1/tracks', trackRouter);

describe('Track Test', () => {
  describe('Create Track ', () => {
    describe('given the user is not logged in', () => {
      test('should return 401', async () => {
        const res = await request(app).post('/api/v1/tracks');

        expect(res.statusCode).toBe(401);
      });
    });

    describe('given the user is logged in', () => {
      test('should return 201', async () => {
        const res = await request(app)
          .post('/api/v1/tracks')
          .set('Authorization', `Bearer ${jwt}`)
          .send(payload);

        expect(res.statusCode).toBe(201);
      });
    });
  });

  describe('Get All Tracks', () => {
    describe('given the user is not logged in', () => {
      test('should return 401', async () => {
        const res = await request(app).get('/api/v1/tracks');

        expect(res.statusCode).toBe(401);
      });
    });

    describe('given the user is logged in', () => {
      test('should return 201', async () => {
        const res = await request(app)
          .get('/api/v1/tracks')
          .set('Authorization', `Bearer ${jwt}`);

        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe('Edit Track route', () => {
    describe('given the user is not logged in', () => {
      test('should return 401', async () => {
        const track: any = await Track.findOne().select('_id');

        const res = await request(app)
          .patch(`/api/v1/tracks/${track._id}`)
          .send({});

        expect(res.statusCode).toBe(401);
      });
    });

    describe('given the logged in user is not the owner of the track', () => {
      test('It should return 401', async () => {
        const decoded: any = await promisify<string, string>(verify)(
          jwt,
          process.env.JWT_SECRET as string
        );

        const track: any = await Track.findOne({
          artist: { $not: { $ne: decoded.id } },
        });

        const res = await request(app)
          .patch(`/api/v1/tracks/${track._id}`)
          .send({});

        expect(res.statusCode).toBe(401);
      });
    });

    describe('given the logged in is the track owner', () => {
      test('It should return 200', async () => {});
    });
  });
});
