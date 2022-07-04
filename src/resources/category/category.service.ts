import { BOOLEAN_MAP, DB_TYPES, SORTING_ORDER, PRODUCT_FIELDS } from '../../constants';
import { CategoryTypegooseRepository } from './category.typegoose.repository';
import { CategoryTypeormRepository } from './category.typeorm.repository';
import {
  ICategory,
  ICategoryService,
  ICategoryRepository,
  ICategoryQueryParams,
  ICategoryExtended,
} from './category.types';
import { isEmptyObject } from '../../helpers/is-empty-object';
import productsService from '../product/product.service';

class CategoryService implements ICategoryService {
  repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  public async getAll() {
    return this.repository.getAll();
  }

  public async getByIdAndQueryParams(id: string, params: ICategoryQueryParams) {
    const category = await this.repository.getById(id);
    if (isEmptyObject(params)) {
      return category;
    }

    const extendedCategory: ICategoryExtended = { ...category };
    if (params.includeProducts && BOOLEAN_MAP[params.includeProducts]) {
      const products = await productsService.getByCategory({ id });

      if (products) extendedCategory.products = products;
    }
    if (params.includeTop3Products && BOOLEAN_MAP[params.includeTop3Products]) {
      const PORDUCTS_NUMBER = 3;
      const top3Products = await productsService.getByCategory({
        id,
        limit: PORDUCTS_NUMBER,
        sortDirection: DB_TYPES.MONGO ? SORTING_ORDER.DESC : SORTING_ORDER.DESC.toUpperCase(),
        sortField: PRODUCT_FIELDS.totalRating,
      });
      if (top3Products) extendedCategory.top3Products = top3Products;
    }
    return extendedCategory;
  }

  public async save(category: ICategory) {
    return this.repository.save(category);
  }
}

const repository =
  process.env.DB === DB_TYPES.POSTGRES ? new CategoryTypeormRepository() : new CategoryTypegooseRepository();
const categoryService = new CategoryService(repository);

export default categoryService;
