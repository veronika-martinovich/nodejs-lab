import { prop } from '@typegoose/typegoose';

export class OrderProduct {
  @prop()
  public __id: string;

  @prop()
  public productId: string;

  @prop()
  public quantity: number;
}
