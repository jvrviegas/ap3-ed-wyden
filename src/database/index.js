import Sequelize from 'sequelize';

import Product from '../app/models/Product';
import Queue from '../app/models/Queue';

import databaseConfig from '../config/database';

const models = [Product, Queue];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig[process.env.NODE_ENV]);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
