/* eslint-disable no-return-await */
import { server } from '../src/server';

const request = require('supertest');
const db = require('./db');

const agent = request.agent(server);

beforeAll(async () => await db.connect());
afterAll(async () => await db.close());

describe('Product router endpoints', () => {
  it('POST /api/products returns value', (done) => {
    agent
      .post('/products')
      .send({ displayName: 'Pokemon Go', categoryId: '', totalRating: 10, price: 100 })
      .expect(200)
      .then((res: any) => {
        expect(res.body._id).toBeTruthy();
        done();
      });
  });

  it('POST /api/products throw error', (done) => {
    agent
      .post('/products')
      .send({})
      .expect(400, {
        statusCode: 400,
        message: 'Invalid data: displayName, totalRating, categoryId, price.',
      })
      .then(() => {
        done();
      });
  });

  it('GET /api/products array have length', (done) => {
    agent
      .get('/products')
      .expect(200)
      .then((res: any) => {
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
        done();
      });
  });

  it('GET /api/products empty array', (done) => {
    db.clear().then(() => {
      agent
        .get('/products')
        .expect(200)
        .then((res: any) => {
          expect(res.body).toBeDefined();
          expect(res.body).toHaveLength(0);
          done();
        });
    });
  });
});
