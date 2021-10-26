import { prop, modelOptions, getModelForClass, Ref } from '@typegoose/typegoose';
import { Category } from '../category/category.typegoose.model';

@modelOptions({
  schemaOptions: { collection: 'products' },
})
export class Product {
  @prop()
  public __id: string;

  @prop()
  public displayName: string;

  @prop({ ref: () => Category })
  public category?: Ref<Category>;

  @prop()
  public categoryId: string;

  @prop({ default: Date.now })
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;
}

export const ProductModel = getModelForClass(Product);
