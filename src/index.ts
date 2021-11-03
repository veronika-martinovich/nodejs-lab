import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import productsRouter from './resources/product/product.router';
import { DBConnect } from './helpers/DBConnect';

const { PORT } = require('./config');

const { middlewareErrorHandler } = require('./errors');

// App
const app: Express = express();
const port = PORT || 3000;

app.use(express.json());
app.use('/', productsRouter);

// Invalid request
app.use((req: Request, res: Response) => {
  res.json({
    error: {
      name: 'Error',
      status: 404,
      message: 'Invalid Request',
      statusCode: 404,
    },
    message: 'Route not found',
  });
});

// Error handler
app.use(middlewareErrorHandler);

DBConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
  });
});
