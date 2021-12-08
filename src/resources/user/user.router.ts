import express, { Request, Response, NextFunction } from 'express';
import usersService from './user.service';
import { validateUser } from './user.validation';
import { hashString } from '../../helpers/hashString';
import { IUserToRegister } from '../../types';
import { Error403 } from '../../helpers/errors';
import { PASSPORT_SECRET } from '../../../credentials/configs';

const jwt = require('jsonwebtoken');

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
      const payload = {
        username: newUser.username,
        id: newUser.__id,
      };
      const token = jwt.sign(payload, PASSPORT_SECRET, {
        expiresIn: 10000000,
      });
      const userToReturn = { ...newUser, ...{ token } };
      delete userToReturn.password;
      res.status(200).json(userToReturn);
      res.end();
    } else {
      throw new Error403('User with provided username already exists');
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/authenticate').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password }: IUserToRegister = req.body;
    const user = await usersService.getByUsername(username);

    if (user) {
      const isPasswordMatched = hashString(password) === user.password;
      if (isPasswordMatched) {
        const payload = {
          username: user.username,
          id: user.__id,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        const token = jwt.sign(payload, PASSPORT_SECRET, {
          expiresIn: 10000000,
        });
        const userToReturn = { ...user, ...{ token } };
        delete userToReturn.password;
        res.status(200).json(userToReturn);
        res.end();
      } else {
        throw new Error403('Password is incorrect');
      }
    } else {
      throw new Error403('Username is incorrect');
    }
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
