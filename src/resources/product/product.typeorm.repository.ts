import { getRepository } from 'typeorm';
import { Product } from './product.typeorm.model';
import { IProduct, IProductRepository, IProductSearchParams } from '../../types';
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
}
