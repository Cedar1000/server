import request from 'supertest';
import app from '../../test/setup';

import { payload } from '../../test/payloads/user.payloads';

describe('User Authentication', () => {
  describe('User Login', () => {
    test('Given email was ommited', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: '', password: 'test1234' });

      expect(res.statusCode).toBe(400);
    });

    test('Given password was ommited', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'ced@ced.com', password: '' });

      expect(res.statusCode).toBe(400);
    });

    test('Given user with provided email does not exist', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'cedr@ced.com', password: 'test1234' });

      expect(res.statusCode).toBe(404);
    });

    test('Given passwod is incorrect', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'ced@ced.com', password: 'test12345' });

      expect(res.statusCode).toBe(401);
    });

    test('Given passwod and email are correct', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'ced@ced.com', password: 'test1234' });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('User Sign Up', () => {
    describe('Given email is invalid', () => {
      test('It should return 500', async () => {
        const res = await request(app)
          .post('/api/v1/users/signup')
          .send({ email: 'dhde7es', password: 'test1234' });

        expect(res.statusCode).toBe(500);
      });
    });

    describe('Given email already exists', () => {
      test('It should return 500', async () => {
        const res = await request(app)
          .post('/api/v1/users/signup')
          .send(payload);

        expect(res.statusCode).toBe(500);
      });
    });

    describe('Given passwords do not match', () => {
      test('It should return 500', async () => {
        const res = await request(app)
          .post('/api/v1/users/signup')
          .send({ ...payload, password: 'test', email: 'new@new.com' });

        expect(res.statusCode).toBe(500);
      });
    });

    describe('Given all fields are valid', () => {
      test('It should return 500', async () => {
        const res = await request(app)
          .post('/api/v1/users/signup')
          .send({ ...payload, email: 'new@new.com' });

        expect(res.statusCode).toBe(201);
      });
    });
  });
});
