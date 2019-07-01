FROM node:8

ADD . /pokedex/log-service

RUN cd /pokedex/log-service; \
    npm install

CMD ["node", "/pokedex/log-service/consumer.js"]