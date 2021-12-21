import express, { Request, Response, NextFunction } from 'express';
import usersService from './user.service';
import { validateUser } from './user.validation';
import { hashString } from '../../helpers/hashString';
import { IUserToRegister, IUserToReturn, ITokenList } from '../../types';
import { ForbiddenError, UnauthorizedError } from '../../helpers/errors';
import { TOKEN, REFRESH_TOKEN } from '../../../credentials/configs';

const jwt = require('jsonwebtoken');
const passport = require('passport');

const usersRouter = express.Router();

const tokenList: ITokenList = {};

const authenticate = passport.authenticate('jwt', { session: false }, async (error: any, token: string) => {
  if (error || !token) {
    throw new UnauthorizedError('Unauthorized');
  }
});

usersRouter.route('/profile').put(authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { __id, fieldsToUpdate } = req.body;
    const user = await usersService.getById(__id);

    if (user && fieldsToUpdate) {
      const updatedUser = await usersService.update(__id, fieldsToUpdate);
      const userToReturn = { ...updatedUser };
      delete userToReturn.password;

      res.status(200).json(userToReturn);
      res.end();
    } else {
      throw new ForbiddenError('Incorrect user data');
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/profile/password').put(authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { __id, password, newPassword } = req.body;
    const user = await usersService.getById(__id);
    const isPasswordMatched = user?.password === hashString(password);

    if (isPasswordMatched && newPassword) {
      const newHashedPassword = hashString(newPassword);
      const fieldsToUpdate = {
        password: newHashedPassword,
      };
      const updatedUser = await usersService.update(__id, fieldsToUpdate);
      const userToReturn = { ...updatedUser };
      delete userToReturn.password;

      res.status(200).json(userToReturn);
      res.end();
    } else {
      throw new ForbiddenError('Incorrect user data');
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/register').post(validateUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, firstName, lastName }: IUserToRegister = req.body;
    const user = await usersService.getByUsername(username);
    if (!user) {
      const hashedPassword = hashString(password);
      const newUser = await usersService.save({
        username,
        password: hashedPassword,
        firstName,
        lastName,
      });
      const userToReturn = { ...newUser };
      delete userToReturn.password;

      res.status(200).json(userToReturn);
      res.end();
    } else {
      throw new ForbiddenError('User with provided username already exists');
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
        };
        const token: string = jwt.sign(payload, TOKEN.secret, {
          expiresIn: TOKEN.expiresIn,
        });
        const refreshToken: string = jwt.sign(payload, REFRESH_TOKEN.secret, {
          expiresIn: REFRESH_TOKEN.expiresIn,
        });
        const userToReturn: IUserToReturn = { ...user, token, refreshToken };
        tokenList[refreshToken] = userToReturn;
        delete userToReturn.password;

        res.status(200).json(userToReturn);
        res.end();
      } else {
        throw new ForbiddenError('Password is incorrect');
      }
    } else {
      throw new ForbiddenError('Username is incorrect');
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.route('/token').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken: oldRefreshToken } = req.body;

    if (!!oldRefreshToken && oldRefreshToken in tokenList) {
      const user = tokenList[oldRefreshToken];
      const payload = {
        username: user.username,
        id: user.__id,
      };

      const token: string = jwt.sign(payload, TOKEN.secret, {
        expiresIn: TOKEN.expiresIn,
      });
      const refreshToken: string = jwt.sign(payload, REFRESH_TOKEN.secret, {
        expiresIn: REFRESH_TOKEN.expiresIn,
      });

      delete tokenList[oldRefreshToken];

      const userToReturn = { ...user, token, refreshToken };
      tokenList[refreshToken] = userToReturn;

      res.status(200).json(userToReturn);
      res.end();
    } else {
      throw new ForbiddenError('Invalid refreshToken');
    }
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
