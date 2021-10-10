const express = require('express');
const mongoose = require('mongoose');

// App

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app
  .route('/products')
  .get((req, res) => {
    // res.status(200).json(products);
    res.end();
  })
  .post((req, res) => {
    // products.push(req.body);
    res.status(204).json(req.body);
    res.end();
  });

// Invalid request
app.use((req, res) => {
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
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
}).once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
