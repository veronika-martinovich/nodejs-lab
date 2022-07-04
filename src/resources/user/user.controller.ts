import usersService from './user.service';
import { ForbiddenError } from '../../helpers/errors';
import { IUserController, INewUser, IUserToRegister, IUserToReturn, ITokenList } from './user.types';
import { hashString } from '../../helpers/hash-string';
import { TOKEN, REFRESH_TOKEN } from '../../../credentials/configs';

const jwt = require('jsonwebtoken');

const tokenList: ITokenList = {};

class UserController implements IUserController {
  public async update({ __id, fieldsToUpdate }: { __id: string; fieldsToUpdate: INewUser }) {
    const user = await usersService.getById(__id);

    if (user && fieldsToUpdate) {
      const updatedUser = await usersService.update(__id, fieldsToUpdate);
      const userToReturn = { ...updatedUser };
      delete userToReturn.password;
      return userToReturn;
    }
    throw new ForbiddenError('Incorrect user data');
  }

  public async updatePassword({
    __id,
    password,
    newPassword,
  }: {
    __id: string;
    password: string;
    newPassword: string;
  }) {
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
      return userToReturn;
    }
    throw new ForbiddenError('Incorrect user data');
  }

  public async register(userToRegister: IUserToRegister) {
    const { username, password, firstName, lastName, role } = userToRegister;
    const user = await usersService.getByUsername(username);
    if (!user) {
      const hashedPassword = hashString(password);
      const newUser = await usersService.save({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        role,
      });
      const userToReturn = { ...newUser };
      delete userToReturn.password;
      return userToReturn;
    }
    throw new ForbiddenError('User with provided username already exists');
  }

  public async authenticate(userToRegister: IUserToRegister) {
    const { username, password } = userToRegister;
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

        return userToReturn;
      }
      throw new ForbiddenError('Password is incorrect');
    } else {
      throw new ForbiddenError('Username is incorrect');
    }
  }

  public async tokenize({ refreshToken: oldRefreshToken }: { refreshToken: string }) {
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

      return userToReturn;
    }
    throw new ForbiddenError('Invalid refreshToken');
  }
}

const userController = new UserController();

export default userController;
