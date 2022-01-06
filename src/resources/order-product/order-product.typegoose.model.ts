import { prop, getModelForClass } from '@typegoose/typegoose';

export class OrderProduct {
  @prop()
  public __id: string;

  @prop()
  public productId: string;

  @prop()
  public quantity: number;
}

export const OrderProductModel = getModelForClass(OrderProduct);
