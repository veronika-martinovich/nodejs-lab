/* eslint-disable import/order */
/* eslint-disable import/first */
import 'reflect-metadata';
import { logMongodbQuery } from './helpers/mongodb-query-logger';

logMongodbQuery();

import express, { Express } from 'express';
import productsRouter from './resources/product/product.router';
import categoriesRouter from './resources/category/category.router';
import usersRouter from './resources/user/user.router';
import orderListRouter from './resources/order-list/order-list.router';
import adminProductsRouter from './resources/admin/product/admin.product.router';
import lastRatingsRouter from './resources/last-ratings/last-ratings.router';
import { applyPassportStrategy } from './helpers/apply-passport-strategy';
import { middlewareHttpLogger } from './middlewares/http-loggers.middleware';
import { middlewareErrorHandler, middlewareNotFoundHandler } from './middlewares/error-handling.middlewares';

const path = require('path');
const http = require('http');
const passport = require('passport');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

const app: Express = express();
// Socket.io
const server = http.createServer(app);
export const io = new Server(server);

// Passport
applyPassportStrategy(passport);
app.use(passport.initialize());

app.use(express.json());

// Http logger
app.use(middlewareHttpLogger);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routers
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/order-list', orderListRouter);
app.use('/', usersRouter);
app.use('/admin/products', adminProductsRouter);
app.use('/', lastRatingsRouter);

// Invalid request
app.use(middlewareNotFoundHandler);

// Error handler
app.use(middlewareErrorHandler);

io.on('connection', (socket: any) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export { server };
