// import productsRouter from './product.router';
import { app } from '../src/index';

const request = require('supertest');
const db = require('./db');

const agent = request.agent(app);

beforeAll(async () => db.connect());
beforeEach(async () => db.clear());
afterAll(async () => db.close());

describe('Product router endpoints', () => {
  it('GET products', async () => {});
});
