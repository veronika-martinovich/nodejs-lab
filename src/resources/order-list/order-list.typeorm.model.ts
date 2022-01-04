import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  RelationId,
} from 'typeorm';

import { User } from '../user/user.typeorm.model';
import { OrderProduct } from '../order-product/order-product.typeorm.model';

@Entity()
export class OrderList {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  @RelationId((orderList: OrderList) => orderList.user)
  public userId: string;

  @OneToMany(() => OrderProduct, (product) => product.orderList)
  products: OrderProduct[];

  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  public quantity: string;
}
