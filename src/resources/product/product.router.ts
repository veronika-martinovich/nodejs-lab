import express, { Request, Response } from 'express';
import productsService from './product.service';

const productsRouter = express.Router();

productsRouter
  .route('/products')
  .get(async (req: Request, res: Response) => {
    const products = await productsService.getAll();
    res.status(200).json(products);
    res.end();
  })
  .post(async (req: Request, res: Response) => {
    const newProduct = await productsService.save({
      displayName: req.body.displayName,
      totalRating: req.body.totalRating,
      price: req.body.price,
    });
    res.status(204).json(newProduct);
    res.end();
  });

export default productsRouter;
