import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  RelationId,
  Index,
  JoinTable,
} from 'typeorm';
import { Category } from '../category/category.typeorm.model';

@Entity()
@Index(['displayName', 'totalRating', 'price'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  @Index()
  public displayName: string;

  @ManyToMany(() => Category)
  @JoinTable()
  category: Category[];

  @Column({ nullable: true })
  @RelationId((product: Product) => product.category)
  public categoryId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @Index()
  public totalRating: number;

  @Column()
  @Index()
  public price: number;
}
