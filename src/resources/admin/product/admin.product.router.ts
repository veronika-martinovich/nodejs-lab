import express, { Request, Response, NextFunction } from 'express';
import productsService from '../../product/product.service';
// import { validateProductBody, validateProductQuery } from '../../product/product.validation';
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

export default adminProductsRouter;
