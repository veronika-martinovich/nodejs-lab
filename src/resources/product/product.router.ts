import express, { Request, Response, NextFunction } from 'express';
import productsService from './product.service';
import { validateQuery } from '../../helpers/validate-query';
import { isEmptyObject } from '../../helpers/validation';
import { IValidationParams } from '../../types';

const productsRouter = express.Router();

productsRouter.all('*', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!isEmptyObject(req.query) || !isEmptyObject(req.body)) {
      const validationParams: IValidationParams = { ...req.query, ...req.body };
      validateQuery(validationParams);
    }
    next();
  } catch (err) {
    next(err);
  }
});

productsRouter
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      let products;
      if (isEmptyObject(req.query)) {
        products = await productsService.getAll();
      } else {
        products = await productsService.get(req.query);
      }

      res.status(200).json(products);
      res.end();
    } catch (err) {
      next(err);
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProduct = await productsService.save({
        displayName: req.body.displayName,
        totalRating: req.body.totalRating,
        price: req.body.price,
        categoryId: req.body.categoryId,
      });
      res.status(200).json(newProduct);
      res.end();
    } catch (err) {
      next(err);
    }
  });

export default productsRouter;
