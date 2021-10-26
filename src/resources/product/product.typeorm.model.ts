import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, RelationId } from 'typeorm';
import { Category } from '../category/category.typeorm.model';

@Entity()
class Product {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  public displayName: string;

  @ManyToOne(() => Category)
  public category: Category;

  @Column()
  @RelationId((product: Product) => product.categoryId)
  public categoryId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  public totalRating: number;

  @Column()
  public price: number;
}

export const ProductModel = new Product();
