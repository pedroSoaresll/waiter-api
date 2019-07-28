FROM node:10.16.0-jessie

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

CMD npm start

EXPOSE 3000