// const mongoose = require('mongoose');
// import mongoose, { Schema, Request, Response } from 'express';

// const { Schema } = mongoose;

// const categorySchema = new Schema(
//   {
//     __id: Schema.Types.ObjectId,
//     displayName: String,
//     createdAt: { type: Date, default: Date.now },
//   },
//   { collection: 'categories' }
// );

// const CategoryModel = mongoose.model('CategoryModel', categorySchema);

import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({
  schemaOptions: { collection: 'categories' },
})
class Category {
  @prop()
  __id: mongoose.Schema.Types.ObjectId;

  @prop()
  public displayName: string;

  @prop({ default: Date.now })
  public createdAt: Date;
}

const CategoryModel = getModelForClass(Category);

module.exports = CategoryModel;
