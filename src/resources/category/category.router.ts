import express, { Request, Response, NextFunction } from 'express';
import categoryController from './category.controller';
import { validateCategoryBody, validateCategoryQuery } from './category.validation';

const categoriesRouter = express.Router();

categoriesRouter
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await categoryController.getAll());
      res.end();
    } catch (err) {
      next(err);
    }
  })
  .post(validateCategoryBody, async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await categoryController.create(req.body.displayName));
      res.end();
    } catch (err) {
      next(err);
    }
  });

categoriesRouter
  .route('/:catId')
  .get(validateCategoryQuery, async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await categoryController.getByIdAndQueryParams(req.params.catId, req.query));
      res.end();
    } catch (err) {
      next(err);
    }
  });

export default categoriesRouter;
