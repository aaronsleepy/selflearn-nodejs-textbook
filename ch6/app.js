const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  // res.send('Hello, Express!');
  res.sendFile(path.join(__dirname, '/static/html', '/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});