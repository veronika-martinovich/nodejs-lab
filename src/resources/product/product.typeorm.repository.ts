import { getRepository } from 'typeorm';
import { Product } from './product.typeorm.model';
import { IProduct, IProductRepository, IProductSearchParams, IProductFieldsToUpdate } from './product.types';
import { NotFoundError } from '../../helpers/errors';

export class ProductTypeormRepository implements IProductRepository {
  public async getAll() {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    if (!products) {
      throw new NotFoundError('Products not found');
    }
    return products;
  }

  public async get(searchParams: IProductSearchParams) {
    const productRepository = getRepository(Product);
    const products = await productRepository.find(searchParams);
    if (!products) {
      throw new NotFoundError('Products not found');
    }
    return products;
  }

  public async getById(id: string) {
    const productRepository = getRepository(Product);
    const products = await productRepository.find({ where: { __id: id } });
    if (!products) {
      throw new NotFoundError('Product not found');
    }
    return products[0];
  }

  public async save(product: IProduct) {
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
  }

  public async update(id: string, fieldsToUpdate: IProductFieldsToUpdate) {
    const productRepository = getRepository(Product);
    await productRepository.update({ __id: id }, { ...fieldsToUpdate });
    const updatedProduct = await productRepository.find({ where: { __id: id } });

    if (!updatedProduct) {
      throw new NotFoundError('Product was not updated');
    }
    return updatedProduct[0];
  }

  public async deleteById(id: string) {
    const productRepository = getRepository(Product);
    const products = await this.get({ where: { __id: id } });
    const productToDelete = products[0];
    const deletedProduct = await productRepository.remove(productToDelete);

    if (!deletedProduct) {
      throw new NotFoundError('Product was not deleted');
    }
    return deletedProduct;
  }

  public async updateSubdocBySelectors(id: string, querySelector: any, updateSelector: any) {
    // Dummy method for mongo db repository compatability
    console.log(id, querySelector, updateSelector);
  }

  public async getAvgRating(id: string) {
    // Dummy method for mongo db repository compatability
    console.log(id);
    const mockAvg = 1;

    return mockAvg;
  }
}
