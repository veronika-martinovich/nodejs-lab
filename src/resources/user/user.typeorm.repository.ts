import { getRepository } from 'typeorm';
import { User } from './user.typeorm.model';
import { IUserRepository, INewUser } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class UserTypeormRepository implements IUserRepository {
  public async getAll() {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    if (!users) {
      throw new NotFoundError('Users not found');
    }
    return users;
  }

  public async getByUsername(username: string) {
    const userRepository = getRepository(User);
    const users = await userRepository.find({ where: { username } });
    if (!users) {
      return null;
    }
    if (users.length > 1) throw new Error('More than one user found with provided username');
    return users[0];
  }

  public async getById(__id: string) {
    const userRepository = getRepository(User);
    const users = await userRepository.find({ where: { __id } });
    if (!users) {
      return null;
    }
    if (users.length > 1) throw new Error('More than one user found with provided username');
    return users[0];
  }

  public async save(user: INewUser) {
    const userRepository = getRepository(User);
    const newUser = userRepository.create({
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });

    const savedUser = await userRepository.save(newUser);

    if (!savedUser) {
      throw new NotFoundError('User was not created');
    }
    return savedUser;
  }

  public async update(__id: string, fieldsToUpdate: INewUser) {
    const userRepository = getRepository(User);
    await userRepository.update({ __id }, { ...fieldsToUpdate });
    const updatedUser = await userRepository.find({ where: { __id } });

    if (!updatedUser) {
      throw new NotFoundError('User was not updated');
    }
    return updatedUser[0];
  }
}
