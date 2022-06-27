import orderListService from './order-list.service';
import { IOrderListController } from './order-list.types';
import { IOrderProductReq } from '../order-product/order-product.types';

class OrderListController implements IOrderListController {
  public async addProducts({ userId, orderProducts }: { userId: string; orderProducts: Array<IOrderProductReq> }) {
    return orderListService.addProducts(userId, orderProducts);
  }

  public async editProducts({ userId, orderProducts }: { userId: string; orderProducts: Array<IOrderProductReq> }) {
    return orderListService.editProducts(userId, orderProducts);
  }

  public async deleteProducts({ userId }: { userId: string }) {
    return orderListService.deleteProducts(userId);
  }
}

const orderListController = new OrderListController();

export default orderListController;
