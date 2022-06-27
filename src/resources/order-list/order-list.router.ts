import express, { Request, Response, NextFunction } from 'express';
import orderListController from './order-list.controller';

const orderListRouter = express.Router();

orderListRouter
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await orderListController.addProducts(req.body));
      res.end();
    } catch (err) {
      next(err);
    }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await orderListController.editProducts(req.body));
      res.end();
    } catch (err) {
      next(err);
    }
  });

orderListRouter.route('/clear').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await orderListController.deleteProducts(req.body));
    res.end();
  } catch (err) {
    next(err);
  }
});

export default orderListRouter;
