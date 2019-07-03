const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const amqp = require('amqplib');

const app = express();
const port = 3000;
const logsExchange = 'logs';
const dbConnHost = `${process.env.DATABASE_HOST || 'localhost'}`;
const amqpConnString = `amqp://${process.env.RABBITMQ_HOST || 'localhost'}`;

let dbConnection;
let amqpConnection;
let mainChannel;

app.use(bodyParser.json());

app.get('/pokemon', async (req, res) => {
  dbConnection.query('SELECT * FROM pokemon', (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
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
        res.status(500).send(err);
      } else {
        const data = result[0];
        publishToChannel('logs', data);
        res.status(200).send(data);
      }
    }
  );
});

const publishToChannel = (exchange, data) => {
  return new Promise((resolve, reject) => {
    mainChannel.assertExchange(exchange, 'fanout', { durable: true });
    mainChannel.publish(
      exchange,
      '',
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
