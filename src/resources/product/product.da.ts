import { Product, ProductModel } from './product.model';

class ProductsDA {
  public getAll = async (): Promise<Array<Product> | unknown> => {
    try {
      const products = await ProductModel.find({});
      return products;
    } catch (error) {
      return console.log(error);
    }
  };

  public save = async (product: Product): Promise<Product | unknown> => {
    try {
      const newProduct = await ProductModel.create(product);
      return newProduct;
    } catch (error) {
      return console.log(error);
    }
  };
}

export default ProductsDA;
