import { UserModel } from './user.typegoose.model';
import { INewUser, IUserRepository } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class UserTypegooseRepository implements IUserRepository {
  getAll = async () => {
    const users = await UserModel.find({}).lean().exec();
    if (!users) {
      throw new NotFoundError('User not found');
    }
    return users;
  };

  save = async (user: INewUser) => {
    const newUser = await UserModel.create(user);

    if (!newUser) {
      throw new NotFoundError('User was not created');
    }
    return newUser;
  };
}
