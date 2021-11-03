import { createConnection } from 'typeorm';
import ORMConfig from '../ormconfig';
import { DB_TYPES } from '../constants';

const mongoose = require('mongoose');
const { DB, MONGO_DB_URL } = require('../config');

export const DBConnect = async () => {
  try {
    if (DB === DB_TYPES.POSTGRES) {
      await createConnection(ORMConfig);
      console.log('Postgres DB connection was successful');
    } else {
      mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Mongo DB connection was successful');
    }
  } catch (error) {
    console.error('DB connection failed', error);
  }
};
