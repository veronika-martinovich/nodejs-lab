import { CategoryTypegooseRepository } from './category.typegoose.repository';
import { CategoryTypeormRepository } from './category.typeorm.repository';
import { ICategory, ICategoryService, ICategoryRepository, ICategoryQueryParams, ICategoryExtended } from '../../types';
import { DB_TYPES, SORTING_ORDER, PRODUCT_FIELDS } from '../../helpers/constants';
import productsService from '../product/product.service';

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
      throw new Error();
    }
  };

  public getByIdAndQueryParams = async (id: string, params: ICategoryQueryParams) => {
    try {
      const category = await this.repository.getById(id);
      if (Object.keys(params).length === 0) {
        return category;
      }

      const extendedCategory: ICategoryExtended = { ...category };
      if (params.includeProducts) {
        const products = await productsService.getByCategory({ id });

        if (products) extendedCategory.products = products;
      }
      if (params.includeTop3Products) {
        const PORDUCTS_NUMBER = 3;
        const top3Products = await productsService.getByCategory({
          id,
          limit: PORDUCTS_NUMBER,
          sortDirection: SORTING_ORDER.DESC,
          sortField: PRODUCT_FIELDS.totalRating,
        });
        if (top3Products) extendedCategory.includeTop3Products = top3Products;
      }
      return extendedCategory;
    } catch (error) {
      throw new Error();
    }
  };

  public save = async (category: ICategory) => {
    try {
      return await this.repository.save(category);
    } catch (error) {
      throw new Error();
    }
  };
}

const repository = DB === DB_TYPES.POSTGRES ? new CategoryTypeormRepository() : new CategoryTypegooseRepository();
const categoryService = new CategoryService(repository);

export default categoryService;
