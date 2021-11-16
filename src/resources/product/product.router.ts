import express, { Request, Response, NextFunction } from 'express';
import productsService from './product.service';

const productsRouter = express.Router();

productsRouter
  .route('/products')
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
      });
      res.status(200).json(newProduct);
      res.end();
    } catch (err) {
      next(err);
    }
  });

export default productsRouter;
