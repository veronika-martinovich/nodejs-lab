import express, { Request, Response, NextFunction } from 'express';
import productController from './product.controller';
import { validateProductBody, validateProductQuery } from './product.validation';
import { authenticate } from '../../middlewares/authenticate.middleware';

const productsRouter = express.Router();

productsRouter
  .route('/')
  .get(validateProductQuery, async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await productController.get(req.body));
      res.end();
    } catch (err) {
      next(err);
    }
  })
  .post(validateProductBody, validateProductQuery, async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await productController.create(req.body));
      res.end();
    } catch (err) {
      next(err);
    }
  });

productsRouter.route('/:prodId/rate').post(authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await productController.rate({ ...req.body, productId: req.params.prodId }));
    res.end();
  } catch (err) {
    next(err);
  }
});

export default productsRouter;
