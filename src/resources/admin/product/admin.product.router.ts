import express, { Request, Response, NextFunction } from 'express';
import productsService from '../../product/product.service';
import { validateProductBody } from '../../product/product.validation';
import { checkAdminRole } from '../../../helpers/check-admin-role';
import { authenticate } from '../../../helpers/authenticate';

const adminProductsRouter = express.Router();

adminProductsRouter
  .route('/:prodId')
  .get(authenticate, checkAdminRole, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.prodId;
      const productToReturn = await productsService.getById(productId);

      res.status(200).json(productToReturn);
      res.end();
    } catch (err) {
      next(err);
    }
  });

adminProductsRouter
  .route('/')
  .post(authenticate, checkAdminRole, validateProductBody, async (req: Request, res: Response, next: NextFunction) => {
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

export default adminProductsRouter;
