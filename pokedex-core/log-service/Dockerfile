FROM node

ADD . /pokedex/log-service
RUN cd /pokedex/log-service; \
    npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

CMD /wait && node /pokedex/log-service/log-service.js info & \
    /wait && node /pokedex/log-service/log-service.js error & \
    /wait && node /pokedex/log-service/log-service.js info > /pokedex/log-service/poke-info.log & \
    /wait && node /pokedex/log-service/log-service.js error > /pokedex/log-service/poke-errors.log