import express, { Request, Response, NextFunction } from 'express';
import orderListService from './order-list.service';

const orderListRouter = express.Router();

orderListRouter.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, products } = req.body;
    const orderToReturn = await orderListService.addProducts(userId, products);
    res.status(200).json(orderToReturn);
    res.end();
  } catch (err) {
    next(err);
  }
});

export default orderListRouter;
