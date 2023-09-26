FROM node:18.18

WORKDIR /workspace/app/
RUN mkdir -p /workspace/app/node_modules && chown -R node:node /workspace/app/node_modules
ENV LANG ja_JP.utf8

COPY ./package.json ./
RUN npm install

USER node