FROM node

ADD . /pokedex/ui
RUN cd /pokedex/ui; \
    npm install; \
    npm run build; \
    cat ./dist/pokedex-ui/index.html > ./dist/pokedex-ui/404.html

EXPOSE 8080

CMD npm --prefix /pokedex/ui run http-server