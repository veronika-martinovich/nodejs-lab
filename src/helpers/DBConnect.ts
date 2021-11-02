import { createConnection } from 'typeorm';
import ORMConfig from '../ormconfig';
import { DB } from '../constants';

const mongoose = require('mongoose');

export const DBConnect = async () => {
  try {
    if (process.env.DB === DB.postgres) {
      await createConnection(ORMConfig);

      console.log('Postgres DB connection was successful');
    } else {
      const connectionUrl = 'mongodb://localhost:27017/game-store';
      mongoose.connect(connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Mongo DB connection was successful');
    }
  } catch (error) {
    console.error('DB connection failed', error);
  }
};
