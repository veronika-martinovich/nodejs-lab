import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({
  schemaOptions: { collection: 'categories' },
})
export class Category {
  @prop()
  __id: mongoose.Schema.Types.ObjectId;

  @prop()
  public displayName: string;

  @prop({ default: Date.now })
  public createdAt: Date;
}

export const CategoryModel = getModelForClass(Category);
