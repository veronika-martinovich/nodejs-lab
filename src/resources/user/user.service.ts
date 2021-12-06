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

  public getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error();
    }
  };

  public save = async (user: INewUser) => {
    try {
      return await this.repository.save(user);
    } catch (error) {
      throw new Error();
    }
  };
}

const repository = DB === DB_TYPES.POSTGRES ? new UserTypeormRepository() : new UserTypegooseRepository();
const usersService = new UsersService(repository);

export default usersService;
