const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const amqp = require('amqplib');

const app = express();
const port = 3000;
const exchangeName = 'logs';
const exchangeType = 'direct';
const infoSeverity = 'info';
const errorSeverity = 'error';
const dbConnHost = `${process.env.DATABASE_HOST || 'localhost'}`;
const amqpConnString = `amqp://${process.env.RABBITMQ_HOST || 'localhost'}`;
const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:8080',
  `http://${process.env.CLIENT_HOST}:8080`
];

let dbConnection;
let amqpConnection;
let mainChannel;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin: ' +
          origin;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.get('/pokemon', async (req, res) => {
  dbConnection.query('SELECT * FROM pokemon', (err, result) => {
    if (err) {
      publishToChannel(err, errorSeverity);
      res.status(500).send(err);
    } else {
      publishToChannel(result, infoSeverity);
      res.status(200).send(result);
    }
  });
});

app.get('/pokemon/:pokenumber', async (req, res) => {
  const pokenumber = req.params.pokenumber;

  dbConnection.query(
    `SELECT * FROM pokemon WHERE pokenumber = ${pokenumber} ORDER BY pokenumber LIMIT 1`,
    (err, result) => {
      if (err) {
        publishToChannel(err, errorSeverity);
        res.status(500).send(err);
      } else {
        const data = result[0];
        if (data) {
          publishToChannel(data, infoSeverity);
          res.status(200).send(data);
        } else {
          err = `Pokemon #${pokenumber} does not exist in the database`;
          publishToChannel(err, errorSeverity);
          res.status(500).send(err);
        }
      }
    }
  );
});

app.post('/pokemon', async (req, res) => {
  const pokemon = req.body;

  if (
    pokemon &&
    pokemon.pokenumber &&
    pokemon.pokename &&
    pokemon.picture_url
  ) {
    dbConnection.query(
      `INSERT INTO pokemon (pokenumber, pokename, picture_url) values (${
        pokemon.pokenumber
      }, '${pokemon.pokename}', '${pokemon.picture_url}');`,
      err => {
        if (err) {
          publishToChannel(err, errorSeverity);
          res.status(500).send(err);
        } else {
          publishToChannel(pokemon, infoSeverity);
          res.status(200).send(pokemon);
        }
      }
    );
  } else {
    const err =
      'Error inserting pokemon in the database: Pokemon data is incomplete';
    publishToChannel(err, errorSeverity);
    res.status(500).send(err);
  }
});

const publishToChannel = (data, severity) => {
  return new Promise((resolve, reject) => {
    mainChannel.assertExchange(exchangeName, exchangeType, { durable: true });
    mainChannel.publish(
      exchangeName,
      severity,
      Buffer.from(JSON.stringify(data)),
      { persistent: true },
      err => {
        if (err) {
          return reject(err);
        }

        resolve();
      }
    );
  });
};

const initService = async () => {
  dbConnection = mysql.createConnection({
    host: dbConnHost,
    user: 'pokeuser',
    password: '123',
    database: 'pokemondb'
  });
  await dbConnection.connect();
  amqpConnection = await amqp.connect(amqpConnString);
  mainChannel = await amqpConnection.createChannel();
};

// Create HTTP Server and start listening on port 3000
server = http.createServer(app);

server.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.info('Listening on port %s.', port);
  }
});

initService();
