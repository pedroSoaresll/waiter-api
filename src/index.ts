import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
require('dotenv').config({});

import app from './app';
import db from './models';
import { normalizePort, onError, onListening } from './utils/utils';
import schema from './graphql/schema';
import AWS from './commons/aws-sdk'
import { sendMessage } from "./commons/mailgun";

let { S3 } = AWS();

const server = createServer(app);
const port = normalizePort(process.env.port || 3000);

console.log(process.env);

// console.log('environment', process.env.NODE_ENV);

db.sequelize.sync()
  .then(() => {
    server.listen(port, async () => {
      console.log(`GraphQL Server is now running on http://localhost:${ port }`);

      new SubscriptionServer({
        execute,
        subscribe,
        schema,
        onConnect: (connectionParams) => connectionParams,
      }, {
        server,
        path: '/graphql',
      });

      await sendMessage({
        to: 'pedrodepaivasoaresll@gmail.com',
        subject: 'teste mailgun',
        template: 'Ola mundo, primeiro email sendo enviado com o mailgun',
      });
    });
    server.on('error', onError(server));
    server.on('listening', onListening(server));
  });

