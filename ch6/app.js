const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const nunjucks = require('nunjucks');


dotenv.config({ path: 'ch6/.env' });
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('ch6/views', {
  express: app,
  watch: true,
});

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

app.use('/', indexRouter);
app.use('/user', userRouter);

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

app.use((req, res, next) => {
  const error = new Error(`No router for ${req.method} ${req.url}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// app.use((req, res, next) => {
//   res.status(404).send('Not Found');
// });
//
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send(err.message);
// });

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});