const amqp = require('amqplib/callback_api');

let emitLog = () => {
  console.log('emit log');
  amqp.connect('amqp://myrabbitmq', (error0, conn) => {
    if (error0) {
      throw error0;
    }

    conn.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      var exchange = 'logs';
      var msg = 'Hello World!';

      channel.assertExchange(exchange, 'fanout', { durable: false });
      channel.publish(exchange, '', Buffer.from(msg));
      console.log(" [x] Sent '%s'", msg);
    });

    setTimeout(() => {
      conn.close();
      process.exit();
    }, 500);
  });
};

module.exports = {
  emitLog: emitLog
};
