const http = require('http');
const products = require('./data');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/products' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(products));
    res.end();
  } else if (req.url === '/products' && req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      const newProduct = JSON.parse(data);
      products.push(newProduct);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Created successfully' }));
      res.end();
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
