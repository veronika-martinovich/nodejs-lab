import categoryService from './category.service';
import { ICategoryQueryParams, ICategoryController } from './category.types';

class CategoryController implements ICategoryController {
  public async getAll() {
    return categoryService.getAll();
  }

  public async create(displayName: string) {
    return categoryService.save({
      displayName,
    });
  }

  public async getByIdAndQueryParams(id: string, params: ICategoryQueryParams) {
    return categoryService.getByIdAndQueryParams(id, params);
  }
}

const categoryController = new CategoryController();

export default categoryController;
