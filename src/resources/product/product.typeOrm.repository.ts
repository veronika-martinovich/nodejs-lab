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
    const newProduct = new Product();
    newProduct.displayName = product.displayName;
    newProduct.price = product.price;
    newProduct.totalRating = product.totalRating;

    const savedProduct = await productRepository.save(newProduct);
    return savedProduct;
  };
}
