import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrderList } from '../order-list/order-list.typeorm.model';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  public productId: string;

  @Column()
  public quantity: string;

  @ManyToOne(() => OrderList, (orderList) => orderList.products)
  orderList: OrderList;
}
