import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';

import { User } from '../user/user.typeorm.model';
import { OrderProduct } from '../order-product/order-product.typeorm.model';

@Entity()
export class OrderList {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.orderList)
  public orderProducts: OrderProduct[];
}
