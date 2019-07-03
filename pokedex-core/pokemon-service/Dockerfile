FROM node

ADD . /app/pokemon-service
RUN cd /app/pokemon-service; \
    npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

EXPOSE 3000

CMD /wait && node /app/pokemon-service/pokemon-service.js