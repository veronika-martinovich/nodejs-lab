import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { Product } from '../product/product.typegoose.model';
import { OrderList } from '../order-list/order-list.typegoose.model';

@modelOptions({
  schemaOptions: { collection: 'order-product' },
})
export class OrderProduct {
  @prop()
  public __id: string;

  @prop({ ref: () => Product })
  public product: Ref<Product>;

  @prop({ ref: () => OrderList })
  public orderList: Ref<OrderList>;

  @prop()
  public quantity: number;
}
