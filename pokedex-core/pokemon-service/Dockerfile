FROM node:8

ADD . /pokedex/pokemon-service

RUN cd /pokedex/pokemon-service; \
    npm install

EXPOSE 3000

CMD ["node", "/pokedex/pokemon-service/bin/www"]