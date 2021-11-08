import { setLogLevel } from '@typegoose/typegoose';

const { NODE_ENV } = require('../config');

export const logMongodbQuery = () => {
  if (NODE_ENV !== 'production') {
    setLogLevel('DEBUG');
  }
};
