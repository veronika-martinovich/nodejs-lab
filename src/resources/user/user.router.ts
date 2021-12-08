import express, { Request, Response, NextFunction } from 'express';
import usersService from './user.service';
import { validateUser } from './user.validation';
import { hashString } from '../../helpers/hashString';
import { IUserToRegister } from '../../types';
import { AlreadyExistsError } from '../../helpers/errors';

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
    const { username, password }: IUserToRegister = req.body;
    const user = await usersService.getByUsername(username);
    if (!user) {
      const hashedPassword = hashString(password);
      const newUser = await usersService.save({
        username,
        password: hashedPassword,
      });
      res.status(200).json(newUser);
      res.end();
    } else {
      throw new AlreadyExistsError('User with provided username already exists');
    }
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
