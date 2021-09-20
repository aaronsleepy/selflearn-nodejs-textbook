const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다');
  next();
});

app.get('/', (req, res, next) => {
  console.log('GET / 요청에만 실행됩니다');
  next();
}, (req, res, next) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.get('/', (req, res) => {
  // res.send('Hello, Express!');
  res.sendFile(path.join(__dirname, '/static/html', '/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});