FROM mysql:5

ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE pokemondb
ENV MYSQL_USER pokeuser
ENV MYSQL_PASSWORD 123

EXPOSE 3306

ADD setup.sql /docker-entrypoint-initdb.d