import { getModelForClass } from '@typegoose/typegoose';
import { OrderList } from '../order-list/order-list.typegoose.model';
import { OrderProduct } from '../order-product/order-product.typegoose.model';

export const OrderListModel = getModelForClass(OrderList);
export const OrderProductModel = getModelForClass(OrderProduct);
