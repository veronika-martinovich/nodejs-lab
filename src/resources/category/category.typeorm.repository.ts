import { getRepository } from 'typeorm';
import { Category } from './category.typeorm.model';
import { ICategory, ICategoryRepository } from '../../types';

export class CategoryTypeormRepository implements ICategoryRepository {
  getAll = async () => {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find({ select: ['__id', 'displayName'] });
    return categories;
  };

  getById = async (id: string) => {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.find({ where: { __id: id } });
    return category;
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
