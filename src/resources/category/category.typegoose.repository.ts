import { CategoryModel } from './category.typegoose.model';
import { ICategory, ICategoryRepository } from '../../types';
import { PRODUCT_FIELDS } from '../../helpers/constants';
import { NotFoundError } from '../../helpers/errors';

export class CategoryTypegooseRepository implements ICategoryRepository {
  public getAll = async () => {
    const selectQuery = `${PRODUCT_FIELDS.id} ${PRODUCT_FIELDS.displayName}`;
    const categories = await CategoryModel.find({}, selectQuery).lean().exec();
    if (!categories) {
      throw new NotFoundError('Categories not found');
    }
    return categories;
  };

  public getById = async (id: string) => {
    const selectQuery = `${PRODUCT_FIELDS.id} ${PRODUCT_FIELDS.displayName}`;
    const category = await CategoryModel.findById(id, selectQuery).lean().exec();
    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }
    return category;
  };

  public save = async (category: ICategory) => {
    const newCategory = await CategoryModel.create(category);
    if (!newCategory) {
      throw new NotFoundError('Category was not created');
    }
    return newCategory;
  };
}
