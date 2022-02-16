import { prop } from '@typegoose/typegoose';

export class UserRating {
  @prop()
  public userId: string;

  @prop()
  public rating: number;

  @prop()
  public comment: string;

  @prop({ default: Date.now })
  public createdAt: Date;
}
