/* eslint-disable import/order */
/* eslint-disable import/first */
import 'reflect-metadata';
import { logMongodbQuery } from './helpers/mongodb-query-logger';

logMongodbQuery();

import express, { Express } from 'express';
import productsRouter from './resources/product/product.router';
import categoriesRouter from './resources/category/category.router';
import usersRouter from './resources/user/user.router';
import { DBConnect } from './helpers/DBConnect';
import { applyPassportStrategy } from './helpers/passport';

const passport = require('passport');
const { PORT } = require('./config');
const { middlewareErrorHandler, middlewareHttpLogger, middlewareNotFoundHandler } = require('./helpers/middlewares');

const app: Express = express();
const port = PORT || 3000;

// Passport
applyPassportStrategy(passport);
app.use(passport.initialize());

app.use(express.json());

// Http logger
app.use(middlewareHttpLogger);

// Routers
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/', usersRouter);

// Invalid request
app.use(middlewareNotFoundHandler);

// Error handler
app.use(middlewareErrorHandler);

DBConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
  });
});
