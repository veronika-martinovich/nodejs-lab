import { CategoryModel } from './category.typegoose.model';
import { ICategory, ICategoryRepository, ICategorySearchParams } from '../../types';

export class CategoryTypegooseRepository implements ICategoryRepository {
  public getAll = async () => {
    const selectQuery = '__id displayName';
    const categories = await CategoryModel.find({}).select(selectQuery);
    return categories;
  };

  public get = async (searchParams: ICategorySearchParams) => {
    const categories = await CategoryModel.find(searchParams.where!)
      .sort(searchParams.order)
      .skip(searchParams.skip!)
      .limit(searchParams.take!);
    return categories;
  };

  public save = async (category: ICategory) => {
    const newCategory = await CategoryModel.create(category);
    return newCategory;
  };
}
