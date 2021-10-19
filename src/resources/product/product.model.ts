import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { collection: 'products' },
})
export class Product {
  @prop()
  __id: string;

  @prop()
  public displayName: string;

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
