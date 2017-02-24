FROM node:argon

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm i && npm run build
