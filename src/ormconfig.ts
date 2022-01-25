import { ConnectionOptions } from 'typeorm';
import { Product } from './resources/product/product.typeorm.model';
import { Category } from './resources/category/category.typeorm.model';
import { User } from './resources/user/user.typeorm.model';
import { UserRating } from './resources/user-rating/user-rating.typeorm.model';
import { OrderProduct } from './resources/order-product/order-product.typeorm.model';
import { OrderList } from './resources/order-list/order-list.typeorm.model';
import { ormCredentials } from '../credentials/orm.creds';

export default {
  type: 'postgres',
  host: 'localhost',
  port: ormCredentials.port,
  username: ormCredentials.username,
  password: ormCredentials.password,
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Product, Category, User, UserRating, OrderProduct, OrderList],
} as ConnectionOptions;
