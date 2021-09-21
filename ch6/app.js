const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.set('port', process.env.PORT || 3000);

dotenv.config({ path: 'ch6/.env' });

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'static')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

try {
  fs.readdirSync('uploads')
} catch (err) {
  console.error('There is no uploads directory');
  fs.mkdirSync('uploads')
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다');
  next();
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/html', 'multipart.html'));
});

app.post('/upload',
  upload.fields([{ name: 'image1' }, { name: 'image2' }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  },
);

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