const express = require('express');
const products = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app
  .route('/products')
  .get((req, res) => {
    res.status(200).json(products);
    res.end();
  })
  .post((req, res) => {
    products.push(req.body);
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
