import { CategoryModel } from './category.typegoose.model';
import { ICategory, ICategoryRepository } from '../../types';
import { PRODUCT_FIELDS } from '../../helpers/constants';

export class CategoryTypegooseRepository implements ICategoryRepository {
  public getAll = async () => {
    const selectQuery = `${PRODUCT_FIELDS.id} ${PRODUCT_FIELDS.displayName}`;
    const categories = await CategoryModel.find({}, selectQuery).lean().exec();
    return categories;
  };

  public getById = async (id: string) => {
    const selectQuery = `${PRODUCT_FIELDS.id} ${PRODUCT_FIELDS.displayName}`;
    const category = await CategoryModel.findById(id, selectQuery).lean().exec();
    if (!category) return null;
    return category;
  };

  public save = async (category: ICategory) => {
    const newCategory = await CategoryModel.create(category);
    return newCategory;
  };
}
