import { getRepository } from 'typeorm';
import { Category } from './category.typeorm.model';
import { ICategory, ICategoryRepository } from '../../types';
import { PRODUCT_FIELDS } from '../../helpers/constants';

export class CategoryTypeormRepository implements ICategoryRepository {
  getAll = async () => {
    const categoryRepository = getRepository(Category);
    // @ts-ignore
    const categories = await categoryRepository.find({ select: [PRODUCT_FIELDS.id, PRODUCT_FIELDS.displayName] });
    return categories;
  };

  getById = async (id: string) => {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.find({
      // @ts-ignore
      select: [PRODUCT_FIELDS.id, PRODUCT_FIELDS.displayName],
      where: { __id: id },
    });
    return category[0];
  };

  save = async (category: ICategory) => {
    const categoryRepository = getRepository(Category);
    const newCategory = categoryRepository.create({
      displayName: category.displayName,
    });

    const savedCategory = await categoryRepository.save(newCategory);
    return savedCategory;
  };
}
