import { prop, modelOptions, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from '../user/user.typegoose.model';
import { OrderProduct } from '../order-product/order-product.typegoose.model';

@modelOptions({
  schemaOptions: { collection: 'order-lists' },
})
export class OrderList {
  @prop()
  public __id: string;

  @prop({ ref: () => User })
  public user: Ref<User>;

  @prop()
  public userId: string;

  @prop({ default: Date.now })
  public createdAt: Date;

  @prop({ ref: () => OrderProduct })
  public products: Ref<OrderProduct>[];
}

export const OrderListModel = getModelForClass(OrderList);
