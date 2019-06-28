const express = require('express');
const cors = require('cors')({
  origin: true
});
const router = express.Router();

const ALLOWED_ORIGINS = ['http://localhost:4200', 'http://localhost:8080'];

function verifyOrigin(request, response) {
  const origin = request.headers.origin;

  if (ALLOWED_ORIGINS.indexOf(origin) > -1) {
    response.set('Access-Control-Allow-Origin', origin);
  }
}

// GET all pokemon.
router.get('/', (req, res) => {
  cors(req, res, () => {
    verifyOrigin(req, res);

    connection.query('SELECT * FROM pokemon', (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    });
  });
});

// Get pokemon by number
router.get('/:pokenumber', (req, res) => {
  cors(req, res, () => {
    verifyOrigin(req, res);

    let pokenumber = req.params.pokenumber;
    connection.query(
      `SELECT * FROM pokemon WHERE pokenumber = ${pokenumber} ORDER BY pokenumber LIMIT 1`,
      (error, results) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.status(200).send(results[0]);
        }
      }
    );
  });
});

module.exports = router;
