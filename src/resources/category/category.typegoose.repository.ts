import { CategoryModel } from './category.typegoose.model';
import { ICategory, ICategoryRepository } from '../../types';

export class CategoryTypegooseRepository implements ICategoryRepository {
  public getAll = async () => {
    const selectQuery = '__id displayName';
    const categories = await CategoryModel.find({}).select(selectQuery);
    return categories;
  };

  public getById = async (id: string) => {
    const category = await CategoryModel.findById(id);
    return category;
  };

  public save = async (category: ICategory) => {
    const newCategory = await CategoryModel.create(category);
    return newCategory;
  };
}
