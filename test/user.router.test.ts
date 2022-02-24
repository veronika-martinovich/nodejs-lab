/* eslint-disable no-return-await */
import { server } from '../src/server';

const request = require('supertest');
const db = require('./db');

const agent = request.agent(server);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('User router endpoints', () => {
  it('POST /register returns value', (done) => {
    agent
      .post('/register')
      .send({ username: 'Test1', password: 'testuser', role: 'buyer' })
      .expect(200)
      .then((res: any) => {
        expect(res.body._id).toBeTruthy();
        done();
      });
  });

  it('POST /register throw error if user already exists', (done) => {
    agent
      .post('/register')
      .send({ username: 'Test1', password: 'testuser', role: 'buyer' })
      .expect(200)
      .then(() => {
        agent
          .post('/register')
          .send({ username: 'Test1', password: 'testuser', role: 'buyer' })
          .expect(403, {
            statusCode: 403,
            message: 'User with provided username already exists',
          })
          .then(() => {
            done();
          });
      });
  });

  it('POST /authenticate returns value', (done) => {
    agent
      .post('/register')
      .send({ username: 'Test1', password: 'testuser', role: 'buyer' })
      .expect(200)
      .then(() => {
        agent
          .post('/authenticate')
          .send({ username: 'Test1', password: 'testuser' })
          .expect(200)
          .then((res: any) => {
            expect(res.body.token).toBeTruthy();
            expect(res.body.refreshToken).toBeTruthy();
            done();
          });
      });
  });

  it('POST /authenticate throws error', (done) => {
    agent
      .post('/register')
      .send({ username: 'Test1', password: 'testuser', role: 'buyer' })
      .expect(200)
      .then(() => {
        agent
          .post('/authenticate')
          .send({ username: 'Test1', password: 'tstuser' })
          .expect(403)
          .then(() => {
            done();
          });
      });
  });
});
