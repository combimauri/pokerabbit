var amqp = require('amqplib');

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

  console.log(' [*] Waiting for logs in %s.', queueData.queue);

  args.forEach(severity => {
    mainChannel.bindQueue(queueData.queue, exchangeName, severity);
  });
  mainChannel.prefetch(1);
  mainChannel.consume(
    queueData.queue,
    msg => {
      if (msg.content) {
        console.log(
          " [x] %s: '%s' \n",
          msg.fields.routingKey,
          msg.content.toString()
        );
      }
    },
    {
      noAck: true
    }
  );
};

listenForMessages();
