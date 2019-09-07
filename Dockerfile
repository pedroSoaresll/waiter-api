FROM node:10.16.0-jessie

WORKDIR /app

COPY package.json .

COPY . .

CMD npm start

EXPOSE 3000