import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, RelationId } from 'typeorm';

@Entity()
class Product {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  public displayName: string;

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
