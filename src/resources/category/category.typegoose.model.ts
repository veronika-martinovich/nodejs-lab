import { prop, modelOptions, getModelForClass, index } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { collection: 'categories' },
})
@index({ __id: 1, displayName: 1 })
export class Category {
  @prop()
  public __id: string;

  @prop()
  public displayName: string;

  @prop({ default: Date.now })
  public createdAt: Date;
}

export const CategoryModel = getModelForClass(Category);
