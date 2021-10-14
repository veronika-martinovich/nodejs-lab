// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const productSchema = new Schema(
//   {
//     __id: Schema.Types.ObjectId,
//     displayName: String,
//     categoryId: Schema.Types.ObjectId,
//     createdAt: { type: Date, default: Date.now },
//     totalRating: Number,
//     price: Number,
//   },
//   { collection: 'products' }
// );

// const ProductModel = mongoose.model('ProductModel', productSchema);

import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({
  schemaOptions: { collection: 'products' },
})
class Product {
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

const ProductModel = getModelForClass(Product);

module.exports = { Product, ProductModel };
