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
    return this.repository.getAll();
  }

  public async getByUsername(username: string) {
    return this.repository.getByUsername(username);
  }

  public async getById(__id: string) {
    return this.repository.getById(__id);
  }

  public async save(user: INewUser) {
    return this.repository.save(user);
  }

  public async update(__id: string, fieldsToUpdate: INewUser) {
    return this.repository.update(__id, fieldsToUpdate);
  }
}

const repository = process.env.DB === DB_TYPES.POSTGRES ? new UserTypeormRepository() : new UserTypegooseRepository();
const usersService = new UsersService(repository);

export default usersService;
