/* eslint-disable no-return-await */
import { server } from '../src/server';

const request = require('supertest');
const db = require('./db');

const agent = request.agent(server);

beforeAll(async () => await db.connect());
afterAll(async () => await db.close());

describe('Category router endpoints', () => {
  it('POST /categories returns value', (done) => {
    agent
      .post('/categories')
      .send({ displayName: 'Test' })
      .expect(200)
      .then((res: any) => {
        expect(res.body._id).toBeTruthy();
        expect(res.body.displayName).toBe('Test');
        done();
      });
  });

  it('GET /categories returns value', (done) => {
    agent
      .get('/categories')
      .expect(200)
      .then((res: any) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toBeDefined();
        done();
      });
  });
});
