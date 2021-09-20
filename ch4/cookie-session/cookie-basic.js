const http = require('http');

http.createServer((req, res) => {
  console.log('req: ', req.url, req.headers.cookie);
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
  res.end('Hello Cookie');
})
  .listen(8080, () => {
    console.log('Listening on port 8080');
  });