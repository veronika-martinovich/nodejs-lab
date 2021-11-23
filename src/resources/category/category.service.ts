import { CategoryTypegooseRepository } from './category.typegoose.repository';
import { CategoryTypeormRepository } from './category.typeorm.repository';
import { ICategory, ICategoryService, ICategoryRepository } from '../../types';
import { DB_TYPES } from '../../helpers/constants';
// import { formCategorySearchParams } from '../../helpers/form-category-search-params';

const { DB } = require('../../config');

class CategoryService implements ICategoryService {
  repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  public getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  public getById = async (id: string) => {
    try {
      return await this.repository.getById(id);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  // public getByIdWithProducts = async (id: string, params: ICategoryQueryParams) => {
  //   try {
  //     // const searchParams: ICategorySearchParams = formCategorySearchParams(params);
  //     const searchParams: ICategorySearchParams = { where: { displayName: 'avc' } };
  //     return await this.repository.get(searchParams);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error();
  //   }
  // };

  public save = async (category: ICategory) => {
    try {
      return await this.repository.save(category);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
}

const repository = DB === DB_TYPES.POSTGRES ? new CategoryTypeormRepository() : new CategoryTypegooseRepository();
const categoryService = new CategoryService(repository);

export default categoryService;
