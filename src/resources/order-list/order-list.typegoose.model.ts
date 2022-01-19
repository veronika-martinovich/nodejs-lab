import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User } from '../user/user.typegoose.model';
import { OrderProduct } from '../order-product/order-product.typegoose.model';

@modelOptions({
  schemaOptions: { collection: 'order-lists' },
})
export class OrderList {
  @prop()
  public __id: string;

  @prop({ ref: () => User })
  public userId: Ref<User>;

  @prop({ ref: () => OrderProduct })
  public orderProducts: Ref<OrderProduct>[];
}
