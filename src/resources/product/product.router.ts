import express, { Request, Response, NextFunction } from 'express';
import productsService from './product.service';
import { validateProductQueryParams } from './product.validation';

const productsRouter = express.Router();

productsRouter
  .route('/products')
  .all(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (Object.keys(req.query).length === 0) {
        next();
      } else {
        validateProductQueryParams(req.query);
        next();
      }
    } catch (err) {
      next(err);
    }
  })
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      let products;
      if (Object.keys(req.query).length === 0) {
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
