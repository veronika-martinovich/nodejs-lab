import express, { Request, Response, NextFunction } from 'express';
import orderListService from './order-list.service';

const orderListRouter = express.Router();

orderListRouter
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, orderProducts } = req.body;
      const orderToReturn = await orderListService.addProducts(userId, orderProducts);
      res.status(200).json(orderToReturn);
      res.end();
    } catch (err) {
      next(err);
    }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, orderProducts } = req.body;
      const orderToReturn = await orderListService.editProducts(userId, orderProducts);
      res.status(200).json(orderToReturn);
      res.end();
    } catch (err) {
      next(err);
    }
  });

orderListRouter.route('/clear').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const orderToReturn = await orderListService.deleteProducts(userId);
    res.status(200).json(orderToReturn);
    res.end();
  } catch (err) {
    next(err);
  }
});

export default orderListRouter;
