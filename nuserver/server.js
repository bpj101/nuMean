const http = require('http');
const server = http.createServer((req, res) => {
  res.end('This is my first response');
});

server.listen(process.env.PORT || 3000);

const http = require('http');
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://hostname:port`);
});
