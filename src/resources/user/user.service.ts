import { UserTypegooseRepository } from './user.typegoose.repository';
import { UserTypeormRepository } from './user.typeorm.repository';
import { INewUser, IUserService, IUserRepository } from '../../types';
import { DB_TYPES } from '../../helpers/constants';

const { DB } = require('../../config');

class UsersService implements IUserService {
  repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error();
    }
  };

  getByUsername = async (username: string) => {
    try {
      return await this.repository.getByUsername(username);
    } catch (error) {
      throw new Error();
    }
  };

  getById = async (__id: string) => {
    try {
      return await this.repository.getById(__id);
    } catch (error) {
      throw new Error();
    }
  };

  save = async (user: INewUser) => {
    try {
      return await this.repository.save(user);
    } catch (error) {
      throw new Error();
    }
  };

  update = async (__id: string, fieldsToUpdate: INewUser) => {
    try {
      return await this.repository.update(__id, fieldsToUpdate);
    } catch (error) {
      throw new Error();
    }
  };
}

const repository = DB === DB_TYPES.POSTGRES ? new UserTypeormRepository() : new UserTypegooseRepository();
const usersService = new UsersService(repository);

export default usersService;
