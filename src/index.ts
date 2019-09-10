require('dotenv').config({});

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import app from './app';
import db from './models';
import { normalizePort, onError, onListening } from './utils/utils';
import schema from './graphql/schema';
import AWS from './commons/aws-sdk';

// execute tools
import './tools/template-builder';
import { compile } from './commons/nunjucks';

const { S3 } = AWS();

const server = createServer(app);
const port = normalizePort(process.env.APP_PORT || 3000);

db.sequelize.sync()
  .then(() => {
    server.listen(port, async () => {
      console.log(`GraphQL Server is now running on http://localhost:${port}`);

      // eslint-disable-next-line no-new
      new SubscriptionServer({
        execute,
        subscribe,
        schema,
        onConnect: (connectionParams) => connectionParams,
      }, {
        server,
        path: '/graphql',
      });

    });
    server.on('error', onError(server));
    server.on('listening', onListening(server));
  });

  console.log(compile('index', {
    username: 'Pedro Oliveira',
  }));