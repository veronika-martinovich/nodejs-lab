import { getRepository } from 'typeorm';
import { Category } from './category.typeorm.model';
import { ICategory, ICategoryRepository, ICategorySearchParams } from '../../types';

export class CategoryTypeormRepository implements ICategoryRepository {
  getAll = async () => {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find({ select: ['__id', 'displayName'] });
    return categories;
  };

  get = async (searchParams: ICategorySearchParams) => {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find(searchParams);
    return categories;
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
