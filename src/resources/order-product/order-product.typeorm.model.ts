import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrderList } from '../order-list/order-list.typeorm.model';
import { Product } from '../product/product.typeorm.model';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  public product: string;

  @Column()
  public quantity: number;

  @ManyToOne(() => OrderList, (orderList) => orderList.orderProducts)
  orderList: OrderList;
}
