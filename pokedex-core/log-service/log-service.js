const amqp = require('amqplib');
const randomName = require('node-random-name');

const serviceName = randomName();
const amqpConnString = `amqp://${process.env.RABBITMQ_HOST || 'localhost'}`;
const exchangeName = 'logs';
const exchanngeType = 'direct';
const args = process.argv.slice(2);

const listenForMessages = async () => {
  if (args.length === 0) {
    console.log('Usage: node log_service.js [info] [error]');
    process.exit(1);
  }

  let amqpConnection = await amqp.connect(amqpConnString);
  let mainChannel = await amqpConnection.createChannel();

  mainChannel.assertExchange(exchangeName, exchanngeType, {
    durable: true
  });

  let queueData = await mainChannel.assertQueue('', { durable: true });
  let severities = '';

  args.forEach(severity => {
    severities += `${severity} `;
    mainChannel.bindQueue(queueData.queue, exchangeName, severity);
  });
  console.log(
    ' [*] %s waiting for %slogs in %s. \n',
    serviceName,
    severities,
    queueData.queue
  );
  mainChannel.prefetch(1);
  mainChannel.consume(
    queueData.queue,
    msg => {
      if (msg.content) {
        console.log(
          " [x] %s received %s: '%s' \n",
          serviceName,
          msg.fields.routingKey,
          msg.content.toString()
        );

        processMessage(msg).then(msg => {
          console.log(
            " [x] %s processed %s: '%s' \n",
            serviceName,
            msg.fields.routingKey,
            msg.content.toString()
          );
          mainChannel.ack(msg);
        });
      }
    },
    {
      noAck: false
    }
  );
};

const processMessage = msg => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(msg);
    }, 5000);
  });
};

listenForMessages();
