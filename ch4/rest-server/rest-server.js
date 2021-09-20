const http = require('http');
const fs = require('fs').promises;

const users = {};

const server = http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url);
    if ('GET' === req.method) {
      if ('/' === req.url) {
        const data = await fs.readFile(`./static/html/rest-sample.html`);
        res.writeHead(200, { 'Content-Type': 'text/html; charset-utf-8' });
        return res.end(data);
      } else if ('/about' === req.url) {
        const data = await fs.readFile(`./static/html/rest-sample-about.html`);
        res.writeHead(200, { 'Content-Type': 'text/html; charset-utf-8' });
        return res.end(data);
      } else if ('/users' === req.url) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(JSON.stringify(users));
      } else {
        try {
          const data = await fs.readFile(`.${req.url}`);
          return res.end(data);
        } catch (err) {
          // 404 Not Found
        }
      }
    } else if ('POST' === req.method) {
      if ('/user' === req.url) {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        return req.on('end', () => {
          console.log('POST Body: ', body);
          const {name} = JSON.parse(body);
          const id = Date.now();

          users[id] = name;
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('등록 성공');
        });
      }
    } else if ('PUT' === req.method) {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        return req.on('end', () => {
          console.log('PUT Body: ', body);
          users[key] = JSON.parse(body).name;
          res.end(JSON.stringify(users));
        });
      }
    } else if ('DELETE' === req.method) {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        return res.end(JSON.stringify(users));
      }
    }

    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(err.message);
  }
});

server.listen(8080, () => {
  console.log('Listening on 8080 port');
});