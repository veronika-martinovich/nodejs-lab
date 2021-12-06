import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { collection: 'users' },
})
export class User {
  @prop()
  public __id: string;

  @prop()
  public username: string;

  @prop({ select: false })
  public password: { type: String; select: false };

  @prop()
  public firstName: string;

  @prop()
  public lastName: string;

  @prop({ default: Date.now })
  public createdAt: Date;
}

export const UserModel = getModelForClass(User);
