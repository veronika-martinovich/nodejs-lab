import express, { Express, Request, Response } from 'express';
import productsRouter from './resources/product/product.router';

const mongoose = require('mongoose');

// App
const app: Express = express();
const PORT = process.env.PORT || 3000;

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

// DB
const connectionUrl = 'mongodb://localhost:27017/game-store';
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error: unknown) => {
  console.error('MongoDB connection error:', error);
}).once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
