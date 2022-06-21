import { UserTypegooseRepository } from './user.typegoose.repository';
import { UserTypeormRepository } from './user.typeorm.repository';
import { INewUser, IUserService, IUserRepository } from './user.types';
import { DB_TYPES } from '../../helpers/constants';

class UsersService implements IUserService {
  repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  public async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error();
    }
  }

  public async getByUsername(username: string) {
    try {
      return await this.repository.getByUsername(username);
    } catch (error) {
      throw new Error();
    }
  }

  public async getById(__id: string) {
    try {
      return await this.repository.getById(__id);
    } catch (error) {
      throw new Error();
    }
  }

  public async save(user: INewUser) {
    try {
      return await this.repository.save(user);
    } catch (error) {
      throw new Error();
    }
  }

  public async update(__id: string, fieldsToUpdate: INewUser) {
    try {
      return await this.repository.update(__id, fieldsToUpdate);
    } catch (error) {
      throw new Error();
    }
  }
}

const repository = process.env.DB === DB_TYPES.POSTGRES ? new UserTypeormRepository() : new UserTypegooseRepository();
const usersService = new UsersService(repository);

export default usersService;
