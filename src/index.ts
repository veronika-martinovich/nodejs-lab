import 'reflect-metadata';
import express, { Express } from 'express';
import productsRouter from './resources/product/product.router';
import { DBConnect } from './helpers/DBConnect';

const { PORT } = require('./config');
const { middlewareErrorHandler, middlewareHttpLogger, middlewareNotFoundHandler } = require('./helpers/middlewares');

const app: Express = express();
const port = PORT || 3000;

app.use(express.json());

// Http logger
app.use(middlewareHttpLogger);

// Routers
app.use('/', productsRouter);

// Invalid request
app.use(middlewareNotFoundHandler);

// Error handler
app.use(middlewareErrorHandler);

DBConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
  });
});
