FROM node:argon

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN npm i && npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
