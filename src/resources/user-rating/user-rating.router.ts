import express, { Request, Response, NextFunction } from 'express';
import userRatingsService from './user-rating.service';

const userRatingRouter = express.Router();

userRatingRouter.route('/lastRatings').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lastRatings = await userRatingsService.getLastRatings();

    res.status(200).json(lastRatings);
    res.end();
  } catch (err) {
    next(err);
  }
});

export default userRatingRouter;
