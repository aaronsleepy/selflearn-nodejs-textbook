const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const { URL } = url;

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(value => value.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

  if (req.url.startsWith('/login')) {
    const targetUrl = new URL(req.url, 'http://dummyurl.com');
    const name = targetUrl.searchParams.get('name');

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);

    const uniqueInt = Date.now();
    session[uniqueInt] = {
      name,
      expires
    };

    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`
    });

    res.end();
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile('./login.html');
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8080, () => {
    console.log('Listening on port 8080');
  });