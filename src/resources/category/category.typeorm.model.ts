import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { ICategory } from './category.types';

@Entity()
@Index(['__id', 'displayName'])
export class Category implements ICategory {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  public displayName: string;

  @CreateDateColumn()
  public createdAt: Date;
}
