import express, { Request, Response, NextFunction } from 'express';
import categoryService from './category.service';

const categoriesRouter = express.Router();

categoriesRouter
  .route('/categories')
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

categoriesRouter.route('/categories/:catId').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryService.getByIdAndQueryParams(req.params.catId, req.query);
    res.status(200).json(category);
    res.end();
  } catch (err) {
    next(err);
  }
});
export default categoriesRouter;
