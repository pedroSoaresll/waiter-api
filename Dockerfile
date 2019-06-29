FROM node:8.16.0-jessie

WORKDIR /app

COPY package.json /app

RUN npm i

COPY . /app

CMD npm start

EXPOSE 3000