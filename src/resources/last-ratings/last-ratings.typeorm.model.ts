import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../user/user.typeorm.model';
import { Product } from '../product/product.typeorm.model';

@Entity()
export class LastRatings {
  @PrimaryGeneratedColumn('uuid')
  public _id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  productId: Product;

  @Column()
  public rating: number;

  @Column()
  public comment: string;

  @CreateDateColumn()
  public createdAt: Date;
}
