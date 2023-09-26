FROM node:18.18

WORKDIR /workspace/app/

COPY ./package.json ./
RUN npm install