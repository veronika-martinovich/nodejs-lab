import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class UserRating {
  @PrimaryGeneratedColumn('uuid')
  public _id: string;

  @Column()
  public userId: string;

  @Column()
  public productId: string;

  @Column()
  public rating: number;

  @Column()
  public comment: string;

  @CreateDateColumn()
  public createdAt: Date;
}
