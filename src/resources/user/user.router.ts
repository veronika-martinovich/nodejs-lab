import express, { Request, Response, NextFunction } from 'express';
import usersService from './user.service';
import { validateUser } from './user.validation';
import { hashString } from '../../helpers/hashString';

const usersRouter = express.Router();

usersRouter.route('/users').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getAll();

    res.status(200).json(users);
    res.end();
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/register').post(validateUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hashedPassword = hashString(req.body.password);
    const newUser = await usersService.save({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(200).json(newUser);
    res.end();
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
