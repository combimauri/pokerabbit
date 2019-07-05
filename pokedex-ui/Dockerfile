FROM node

ADD . /pokedex/ui
RUN npm install -g @angular/cli http-server; \
    cd /pokedex/ui; \
    npm install; \
    ng build --prod; \
    cat ./dist/pokedex-ui/index.html > ./dist/pokedex-ui/404.html

EXPOSE 8080

CMD http-server /pokedex/ui/dist/pokedex-ui