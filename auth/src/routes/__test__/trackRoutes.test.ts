import request from 'supertest';

import app from '../../test/setup';

import Track from '../../models/trackModel';

import { payload } from '../../test/payloads/track.payloads';
import getJwt from '../../uitils/getMockJWT';

let jwt: string;
let userID: any;

beforeAll(async () => {
  const { token, userId } = await getJwt();
  jwt = token;
  userID = userId;
});

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

  describe('Get Single Track', () => {
    describe('given the user is not logged in', () => {
      test('should return 401', async () => {
        const track: any = await Track.findOne().select('_id');

        const res = await request(app)
          .get(`/api/v1/tracks/${track._id}`)
          .send({});

        expect(res.statusCode).toBe(401);
      });
    });

    describe('given the user is logged in', () => {
      test('It should return 200', async () => {
        const track: any = await Track.findOne({
          artist: userID,
        });

        const res = await request(app)
          .patch(`/api/v1/tracks/${track._id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe('Edit Track ', () => {
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
        const track: any = await Track.findOne({
          artist: { $ne: userID },
        });

        const res = await request(app)
          .patch(`/api/v1/tracks/${track._id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        expect(res.statusCode).toBe(403);
      });
    });

    describe('given the logged in is the track owner', () => {
      test('It should return 200', async () => {
        const track: any = await Track.findOne({
          artist: userID,
        });

        const res = await request(app)
          .patch(`/api/v1/tracks/${track._id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe('Delete Track', () => {
    describe('given the user is not logged in', () => {
      test('should return 401', async () => {
        const track: any = await Track.findOne().select('_id');

        const res = await request(app)
          .delete(`/api/v1/tracks/${track._id}`)
          .send({});

        expect(res.statusCode).toBe(401);
      });
    });

    describe('given the logged in user is not the owner of the track', () => {
      test('It should return 401', async () => {
        const track: any = await Track.findOne({
          artist: { $ne: userID },
        });

        const res = await request(app)
          .delete(`/api/v1/tracks/${track._id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        expect(res.statusCode).toBe(403);
      });
    });

    describe('given the logged in is the track owner', () => {
      test('It should return 200', async () => {
        const track: any = await Track.findOne({
          artist: userID,
        });

        const res = await request(app)
          .delete(`/api/v1/tracks/${track._id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .send({});

        expect(res.statusCode).toBe(204);
      });
    });
  });
});
