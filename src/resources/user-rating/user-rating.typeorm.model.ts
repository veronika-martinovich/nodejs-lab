import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRating {
  @PrimaryGeneratedColumn('uuid')
  public __id: string;

  @Column()
  public userId: string;

  @Column()
  public productId: string;

  @Column()
  public rating: number;

  @Column()
  public comment: string;
}
