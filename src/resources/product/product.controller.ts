import productsService from './product.service';
import { IProductController, IProductQueryParams, IProduct } from './product.types';
import { IUserRatingReq } from '../user-rating/user-rating.types';
import { isEmptyObject } from '../../helpers/is-empty-object';

class ProductController implements IProductController {
  public async get(params: IProductQueryParams) {
    let products;
    if (isEmptyObject(params)) {
      products = await productsService.getAll();
    } else {
      products = await productsService.get(params);
    }

    return products;
  }

  public async create(product: IProduct) {
    const newProduct = await productsService.save({
      displayName: product.displayName,
      totalRating: product.totalRating,
      price: product.price,
      categoryId: product.categoryId,
    });
    return newProduct;
  }

  public async rate(userRating: IUserRatingReq) {
    return productsService.rate(userRating);
  }
}

const productController = new ProductController();

export default productController;
