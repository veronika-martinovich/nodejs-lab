import { getRepository } from 'typeorm';
import { Product } from './product.typeorm.model';
import { IProduct } from '../../types';

class ProductTypeOrmRepository {
  getAll = async (): Promise<Array<IProduct>> => {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    return products;
  };

  save = async (product: IProduct): Promise<IProduct> => {
    /* Question: Should product be created via new Product() or we can just save
        product object from the params? Works with both variants
      */
    const productRepository = getRepository(Product);
    const newProduct = new Product();
    newProduct.displayName = product.displayName;
    newProduct.price = product.price;
    newProduct.totalRating = product.totalRating;

    const savedProduct = await productRepository.save(newProduct);
    return savedProduct;
  };
}

const productTypeOrmRepository = new ProductTypeOrmRepository();

export default productTypeOrmRepository;
