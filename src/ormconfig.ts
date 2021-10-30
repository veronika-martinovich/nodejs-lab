import { ConnectionOptions } from 'typeorm';
import { Product } from './resources/product/product.typeorm.model';
import { Category } from './resources/category/category.typeorm.model';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Hallelujah1!',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Product, Category],
} as ConnectionOptions;
