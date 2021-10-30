import { createConnection } from 'typeorm';
import ORMConfig from '../ormconfig';

export const DBConnect = async () => {
  try {
    await createConnection(ORMConfig);

    console.log('DB connection was successful');
  } catch (error) {
    console.error('DB connection failed', error);
  }
};
