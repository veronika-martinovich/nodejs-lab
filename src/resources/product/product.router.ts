import express, { Request, Response } from 'express';
import productsService from './product.service';

const { asyncErrorHandler } = require('../../errors');

const productsRouter = express.Router();

productsRouter
  .route('/products')
  .get(
    asyncErrorHandler(async (req: Request, res: Response) => {
      const products = await productsService.getAll();
      res.status(200).json(products);
      res.end();
    })
  )
  .post(
    asyncErrorHandler(async (req: Request, res: Response) => {
      const newProduct = await productsService.save({
        displayName: req.body.displayName,
        totalRating: req.body.totalRating,
        price: req.body.price,
      });
      res.status(204).json(newProduct);
      res.end();
    })
  );

export default productsRouter;
