FROM node:18.18

WORKDIR /home/node/app

RUN mkdir -p /node_modules && chown -R node:node /node_modules
COPY ./package.json ./
RUN npm install

RUN chown -R node:node node_modules

USER node
