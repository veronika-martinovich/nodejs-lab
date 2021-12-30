import { prop, modelOptions, getModelForClass, Ref, index } from '@typegoose/typegoose';
import { Category } from '../category/category.typegoose.model';
import { UserRating } from '../user-rating/user-rating.typegoose.model';

@modelOptions({
  schemaOptions: { collection: 'products' },
})
@index({ displayName: 1, totalRating: 1, price: 1 })
export class Product {
  @prop()
  public __id: string;

  @prop()
  public displayName: string;

  @prop({ ref: () => Category })
  public category?: Ref<Category>[];

  @prop()
  public categoryId: string;

  @prop({ default: Date.now })
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;

  @prop({ type: () => UserRating })
  public ratings: UserRating[];
}

export const ProductModel = getModelForClass(Product);
