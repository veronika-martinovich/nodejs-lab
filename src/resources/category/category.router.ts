import express, { Request, Response, NextFunction } from 'express';
import categoryService from './category.service';
import { validateQuery } from '../../helpers/validate-query';
import { isEmptyObject } from '../../helpers/validation';
import { IValidationParams } from '../../types';

const categoriesRouter = express.Router();

categoriesRouter.all('*', async (req: Request, res: Response, next: NextFunction) => {
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

categoriesRouter
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getAll();

      res.status(200).json(categories);
      res.end();
    } catch (err) {
      next(err);
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = await categoryService.save({
        displayName: req.body.displayName,
      });
      res.status(200).json(newCategory);
      res.end();
    } catch (err) {
      next(err);
    }
  });

categoriesRouter.route('/:catId').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryService.getByIdAndQueryParams(req.params.catId, req.query);
    res.status(200).json(category);
    res.end();
  } catch (err) {
    next(err);
  }
});

export default categoriesRouter;
