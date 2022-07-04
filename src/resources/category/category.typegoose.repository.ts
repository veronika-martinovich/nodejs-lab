import { CategoryModel } from './category.typegoose.model';
import { ICategory, ICategoryRepository } from './category.types';
import { PRODUCT_FIELDS } from '../../constants';
import { NotFoundError } from '../../helpers/errors';

export class CategoryTypegooseRepository implements ICategoryRepository {
  public async getAll() {
    const selectQuery = `${PRODUCT_FIELDS.id} ${PRODUCT_FIELDS.displayName}`;
    const categories = await CategoryModel.find({}, selectQuery).lean().exec();
    if (!categories) {
      throw new NotFoundError('Categories not found');
    }
    return categories;
  }

  public async getById(id: string) {
    const selectQuery = `${PRODUCT_FIELDS.id} ${PRODUCT_FIELDS.displayName}`;
    const category = await CategoryModel.findById(id, selectQuery).lean().exec();
    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }
    return category;
  }

  public async save(category: ICategory) {
    const newCategory = await CategoryModel.create(category);
    const categoryToReturn = await CategoryModel.findOne({ _id: newCategory._id }).lean().exec();

    if (!categoryToReturn) {
      throw new NotFoundError('Category was not created');
    }
    return categoryToReturn;
  }
}
