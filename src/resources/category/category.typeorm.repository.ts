import { getRepository } from 'typeorm';
import { Category } from './category.typeorm.model';
import { ICategory, ICategoryRepository } from './category.types';
import { PRODUCT_FIELDS } from '../../constants';
import { NotFoundError } from '../../helpers/errors';

export class CategoryTypeormRepository implements ICategoryRepository {
  public async getAll() {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find({
      select: [PRODUCT_FIELDS.id, PRODUCT_FIELDS.displayName],
    } as any);
    if (!categories) {
      throw new NotFoundError('Categories not found');
    }
    return categories;
  }

  public async getById(id: string) {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.find({
      select: [PRODUCT_FIELDS.id, PRODUCT_FIELDS.displayName],
      where: { __id: id },
    } as any);
    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }
    return category[0];
  }

  public async save(category: ICategory) {
    const categoryRepository = getRepository(Category);
    const newCategory = categoryRepository.create({
      displayName: category.displayName,
    });

    const savedCategory = await categoryRepository.save(newCategory);
    if (!savedCategory) {
      throw new NotFoundError('Category was not created');
    }
    return savedCategory;
  }
}
