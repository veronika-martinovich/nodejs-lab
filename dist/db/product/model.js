"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    __id: Schema.Types.ObjectId,
    displayName: String,
    categoryId: Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    totalRating: Number,
    price: Number,
}, { collection: 'products' });
var ProductModel = mongoose.model('ProductModel', productSchema);
module.exports = ProductModel;
