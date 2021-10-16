import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({
  schemaOptions: { collection: 'products' },
})
export class Product {
  @prop()
  __id: mongoose.Schema.Types.ObjectId;

  @prop()
  public displayName: string;

  @prop()
  public categoryId: mongoose.Schema.Types.ObjectId;

  @prop({ default: Date.now })
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;
}

export const ProductModel = getModelForClass(Product);
