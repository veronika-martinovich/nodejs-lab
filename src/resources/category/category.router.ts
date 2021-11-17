import express, { Request, Response, NextFunction } from 'express';
import categoryService from './category.service';

const categoriesRouter = express.Router();

categoriesRouter
  .route('/categories')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      let categories;
      if (Object.keys(req.query).length === 0) {
        categories = await categoryService.getAll();
      } else {
        categories = await categoryService.get(req.query);
      }

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

export default categoriesRouter;
