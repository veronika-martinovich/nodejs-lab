import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  public displayName: string;

  @CreateDateColumn()
  public createdAt: Date;
}
