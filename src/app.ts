import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';
import schema from './graphql/schema';
import db from './models';
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';
import { DataLoaderFactory } from './dataloaders/DataLoaderFactory';
import { RequestedFields } from './ast/RequestedFields';
import { normalizePort } from './utils/utils';

class App {
  public express: express.Application;

  public dataLoaderFactory!: DataLoaderFactory;

  public requestedFields!: RequestedFields;

  constructor() {
    this.express = express();
    this.init();
  }

  init(): void {
    this.dataLoaderFactory = new DataLoaderFactory(db);
    this.requestedFields = new RequestedFields();
    this.middleware();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use('/graphql',
      extractJwtMiddleware(),

      (req:any, res, next) => {
        req.context.db = db;
        req.context.dataLoaders = this.dataLoaderFactory.getLoaders();
        req.context.requestedFields = this.requestedFields;
        next();
      },

      graphqlHTTP((req:any) => ({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: req.context,
        subscriptionsEndpoint: `ws://localhost:${process.env.port}/subscription`,
      })));
  }
}

export default new App().express;
