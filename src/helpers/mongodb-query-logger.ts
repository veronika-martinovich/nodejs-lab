import { setLogLevel } from '@typegoose/typegoose';

export const logMongodbQuery = () => {
  if (process.env.NODE_ENV !== 'production') {
    setLogLevel('DEBUG');
  }
};
