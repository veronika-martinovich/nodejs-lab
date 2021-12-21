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

  getByUsername = async (username: string) => {
    const user = await UserModel.findOne({ username }).lean().exec();

    if (!user) {
      return null;
    }
    return user;
  };

  getById = async (__id: string) => {
    const user = await UserModel.findById(__id).lean().exec();

    if (!user) {
      return null;
    }
    return user;
  };

  save = async (user: INewUser) => {
    const newUser = await UserModel.create(user);
    const userToReturn = await UserModel.findOne({ _id: newUser._id }).lean().exec();

    if (!userToReturn) {
      throw new NotFoundError('User was not created');
    }

    return userToReturn;
  };

  update = async (__id: string, fieldsToUpdate: INewUser) => {
    await UserModel.updateOne({ _id: __id }, { ...fieldsToUpdate }).exec();
    const updatedUser = await UserModel.findOne({ _id: __id }).lean().exec();
    if (!updatedUser) {
      throw new NotFoundError('User was not updated');
    }
    return updatedUser;
  };
}
