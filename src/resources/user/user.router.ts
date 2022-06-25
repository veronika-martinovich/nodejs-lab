import express, { Request, Response, NextFunction } from 'express';
import userController from './user.controller';
import { validateUser } from './user.validation';
import { authenticate } from '../../helpers/authenticate';

const usersRouter = express.Router();

usersRouter.route('/profile').put(authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await userController.update(req.body));
    res.end();
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/profile/password').put(authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await userController.updatePassword(req.body));
    res.end();
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/register').post(validateUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await userController.register(req.body));
    res.end();
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/authenticate').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await userController.authenticate(req.body));
    res.end();
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/token').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await userController.tokenize(req.body));
    res.end();
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
