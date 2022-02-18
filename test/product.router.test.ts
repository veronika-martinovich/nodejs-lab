/* eslint-disable no-return-await */
import { app } from '../src/index';

const request = require('supertest');
const db = require('./db');

const agent = request.agent(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('Product router endpoints', () => {
  it('POST /api/products returns value', (done) => {
    agent
      .post('/products')
      .send({ displayName: 'Pokemon Go', categoryId: '', totalRating: 10, price: 100 })
      .expect(200)
      .then((res: any) => {
        console.log(res.body);
        expect(res.body.__id).toBeTruthy();
        done();
      });
  });
});
