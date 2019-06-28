const express = require('express');
const router = express.Router();

// GET home api page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pokedex Service' });
});

module.exports = router;
