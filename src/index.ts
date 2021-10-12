import express, { Express, Request, Response } from 'express';

const mongoose = require('mongoose');
const productsDb = require('./db/product/db');

// App

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app
  .route('/products')
  .get(async (req: Request, res: Response) => {
    const products = await productsDb.getAll();
    res.status(200).json(products);
    res.end();
  })
  .post(async (req: Request, res: Response) => {
    const newProduct = await productsDb.save({
      displayName: req.body.displayName,
      totalRating: req.body.totalRating,
      price: req.body.price,
    });
    res.status(204).json(newProduct);
    res.end();
  });

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
