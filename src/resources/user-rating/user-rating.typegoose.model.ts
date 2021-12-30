import { prop } from '@typegoose/typegoose';

export class UserRating {
  @prop()
  public __id: string;

  @prop()
  public userId: string;

  @prop()
  public rating: number;

  @prop()
  public comment: string;
}
