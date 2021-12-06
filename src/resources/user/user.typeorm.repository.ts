import { getRepository } from 'typeorm';
import { User } from './user.typeorm.model';
import { IUserRepository, INewUser } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class UserTypeormRepository implements IUserRepository {
  getAll = async () => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    if (!users) {
      throw new NotFoundError('Users not found');
    }
    return users;
  };

  save = async (user: INewUser) => {
    const userRepository = getRepository(User);
    const newUser = userRepository.create({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const savedUser = await userRepository.save(newUser);

    if (!savedUser) {
      throw new NotFoundError('User was not created');
    }
    return savedUser;
  };
}
