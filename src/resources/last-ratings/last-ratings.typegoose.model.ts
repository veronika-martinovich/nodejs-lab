import { prop, Ref, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { User } from '../user/user.typegoose.model';
import { Product } from '../product/product.typegoose.model';

@modelOptions({
  schemaOptions: { collection: 'last-ratings' },
})
export class LastRatings {
  @prop({ ref: () => User })
  public userId: Ref<User>;

  @prop({ ref: () => Product })
  public productId: Ref<Product>;

  @prop()
  public rating: number;

  @prop()
  public comment: string;

  @prop({ default: Date.now })
  public createdAt: Date;
}

export const LastRatingsModel = getModelForClass(LastRatings);
