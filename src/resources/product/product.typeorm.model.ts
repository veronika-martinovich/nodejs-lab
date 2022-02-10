import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  RelationId,
  Index,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../category/category.typeorm.model';
import { OrderProduct } from '../order-product/order-product.typeorm.model';

@Entity()
@Index(['displayName', 'totalRating', 'price'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  public displayName: string;

  @ManyToMany(() => Category)
  @JoinTable()
  category: Category[];

  @Column({ nullable: true })
  @RelationId((product: Product) => product.category)
  public categoryId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column({ type: 'float', nullable: true })
  public totalRating: number;

  @Column()
  public price: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  public orderProducts: OrderProduct[];
}
