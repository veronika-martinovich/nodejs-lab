const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    __id: Schema.Types.ObjectId,
    displayName: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'categories' }
);

const CategoryModel = mongoose.model('CategoryModel', categorySchema);

module.exports = CategoryModel;
