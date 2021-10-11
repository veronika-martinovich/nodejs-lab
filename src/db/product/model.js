const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    __id: Schema.Types.ObjectId,
    displayName: String,
    categoryId: Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    totalRating: Number,
    price: Number,
  },
  { collection: 'products' }
);

const ProductModel = mongoose.model('ProductModel', productSchema);

module.exports = ProductModel;
