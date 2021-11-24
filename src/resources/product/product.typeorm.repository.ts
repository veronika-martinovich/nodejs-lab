import { getRepository } from 'typeorm';
import { Product } from './product.typeorm.model';
import { IProduct, IProductRepository, IProductSearchParams } from '../../types';

export class ProductTypeormRepository implements IProductRepository {
  getAll = async () => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    return products;
  };

  get = async (searchParams: IProductSearchParams) => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find(searchParams);
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
    return savedProduct;
  };
}
