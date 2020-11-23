import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import http from 'http';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api', routes);
  }
}

export default new App().server;
