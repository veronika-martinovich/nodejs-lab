import { httpLogFormat } from './http-loggers';
import { IMongodbLoggerProps } from '../types';

const { createLogger, transports } = require('winston');
const { NODE_ENV } = require('../config');

const loggerOptions = {
  filename: 'mongodb-query.log',
  level: 'debug',
  colorize: true,
};

const mongodbQueryLogger = createLogger({
  format: httpLogFormat,
  transports: [new transports.File(loggerOptions)],
});

export const logMongodbQuery = ({ method, data }: IMongodbLoggerProps) => {
  if (NODE_ENV !== 'production') {
    mongodbQueryLogger.debug(`${method}: ${data}`);
  }
};
