import { ConnectionOptions } from 'typeorm';
import { Product } from './resources/product/product.typeorm.model';
import { Category } from './resources/category/category.typeorm.model';
import ormCredentials from './orm.credentials';

export default {
  type: 'postgres',
  host: 'localhost',
  port: ormCredentials.port,
  username: ormCredentials.username,
  password: ormCredentials.password,
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Product, Category],
} as ConnectionOptions;
