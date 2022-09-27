import request from 'supertest';

import app from '../../test/setup';
import getJwt from '../../uitils/getMockJWT';
import { payload } from '../../test/payloads/album.payloads';

let jwt: string;
let userID: any;

beforeAll(async () => {
  const { token, userId } = await getJwt();
  jwt = token;
  userID = userId;
});

describe('Album Test', () => {
  describe('Create Album', () => {
    describe('Given the user is not logged in', () => {
      test('It should return 401', async () => {
        const res = await request(app).post('/api/v1/album');

        expect(res.statusCode).toBe(401);
      });
    });

    describe('Given the user is logged in and is an artist', () => {
      test('should return 201', async () => {
        const res = await request(app)
          .post('/api/v1/album')
          .set('Authorization', `Bearer ${jwt}`)
          .send(payload);

        expect(res.statusCode).toBe(201);
      });
    });
  });
});
