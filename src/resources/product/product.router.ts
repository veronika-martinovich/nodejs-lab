import express, { Request, Response, NextFunction } from 'express';
import productsService from './product.service';
import { validateQuery } from '../../helpers/validate-query';
import { isEmptyObject } from '../../helpers/validation';
import { BadRequestError } from '../../helpers/errors';
import { authenticate } from '../../helpers/authenticate';
import { IUserRating } from '../../types';

const productsRouter = express.Router();

productsRouter
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const invalidFields: Array<string> | undefined = validateQuery(req.query, req.body);

      if (invalidFields) {
        throw new BadRequestError(`Invalid data: ${invalidFields.join(', ')}.`);
      }

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
      // const invalidFields: Array<string> | undefined = validateQuery(req.query, req.body);

      // if (invalidFields) {
      //   throw new BadRequestError(`Invalid data: ${invalidFields.join(', ')}.`);
      // }

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

productsRouter.route('/:prodId/rate').post(authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRating: IUserRating = { ...req.body, productId: req.params.prodId };
    const updatedProduct = await productsService.rate(userRating);

    res.status(200).json(updatedProduct);
    res.end();
  } catch (err) {
    next(err);
  }
});

export default productsRouter;
