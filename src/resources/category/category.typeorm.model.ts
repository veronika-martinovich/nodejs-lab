import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ICategory } from '../../types';

@Entity()
export class Category implements ICategory {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  public displayName: string;

  @CreateDateColumn()
  public createdAt: Date;
}
