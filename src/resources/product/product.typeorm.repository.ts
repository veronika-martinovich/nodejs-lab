import { getRepository } from 'typeorm';
import { Product } from './product.typeorm.model';
import { IProduct, IProductRepository, IProductSearchParams, IProductFieldsToUpdate } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class ProductTypeormRepository implements IProductRepository {
  getAll = async () => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    if (!products) {
      throw new NotFoundError('Products not found');
    }
    return products;
  };

  get = async (searchParams: IProductSearchParams) => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find(searchParams);
    if (!products) {
      throw new NotFoundError('Products not found');
    }
    return products;
  };

  save = async (product: IProduct) => {
    const productRepository = getRepository(Product);
    const newProduct = productRepository.create({
      displayName: product.displayName,
      price: product.price,
      totalRating: product.totalRating,
      categoryId: product.categoryId,
    });

    const savedProduct = await productRepository.save(newProduct);
    if (!savedProduct) {
      throw new NotFoundError('Product was not created');
    }
    return savedProduct;
  };

  update = async (__id: string, fieldsToUpdate: IProductFieldsToUpdate) => {
    const productRepository = getRepository(Product);
    await productRepository.update({ __id }, { ...fieldsToUpdate });
    const updatedProduct = await productRepository.find({ where: { __id } });

    if (!updatedProduct) {
      throw new NotFoundError('Product was not updated');
    }
    return updatedProduct[0];
  };

  updateSubdocBySelectors = async (querySelector: any, updateSelector: any) => {
    // Dummy method for mongo db repository compatability
    console.log(querySelector, updateSelector);
  };

  getAvgRating = async (__id: string) => {
    // Dummy method for mongo db repository compatability
    console.log(__id);
    const mockAvg = 1;

    return mockAvg;
  };
}
