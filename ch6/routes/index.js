const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // res.send('Hello Express');
  res.render('index', { title: 'Express' });
});

module.exports = router;