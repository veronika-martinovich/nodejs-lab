import { getRepository } from 'typeorm';
import { Product } from './product.typeorm.model';
import { IProduct, IProductRepository } from '../../types';

export class ProductTypeormRepository implements IProductRepository {
  getAll = async () => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    return products;
  };

  save = async (product: IProduct) => {
    const productRepository = getRepository(Product);
    const newProduct = productRepository.create({
      displayName: product.displayName,
      price: product.price,
      totalRating: product.totalRating,
    });

    const savedProduct = await productRepository.save(newProduct);
    return savedProduct;
  };
}
