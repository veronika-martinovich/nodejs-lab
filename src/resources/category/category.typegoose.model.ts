import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { collection: 'categories' },
})
export class Category {
  @prop()
  public __id: string;

  @prop()
  public displayName: string;

  @prop({ default: Date.now })
  public createdAt: Date;
}

export const CategoryModel = getModelForClass(Category);
