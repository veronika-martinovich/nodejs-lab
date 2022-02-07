import express, { Request, Response, NextFunction } from 'express';
import lastRatingsService from './last-ratings.service';

const path = require('path');

const lastRatingsRouter = express.Router();

lastRatingsRouter.route('/lastRatings').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lastRatings = await lastRatingsService.getAll();
    res.status(200).json(lastRatings);
    res.end();
  } catch (err) {
    next(err);
  }
});

// Create enpoint for html page to not to create separate project for client side logic
lastRatingsRouter.route('/lastRatingsPage').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendFile(path.join(__dirname, '../../screens/index.html'));
  } catch (err) {
    next(err);
  }
});

export default lastRatingsRouter;
