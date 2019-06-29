import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import app from './app';
import db from './models';
import { normalizePort, onError, onListening } from './utils/utils';
import schema from './graphql/schema';

const server = createServer(app);
const port = normalizePort(process.env.port || 3000);

// console.log('environment', process.env.NODE_ENV);

db.sequelize.sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`GraphQL Server is now running on http://localhost:${ port }`);

      new SubscriptionServer({
        execute,
        subscribe,
        schema,
        onConnect: (connectionParams) => connectionParams,
      }, {
        server,
        path: '/graphql',
      })
    });
    server.on('error', onError(server));
    server.on('listening', onListening(server));
  });

