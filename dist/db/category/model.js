"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new Schema({
    __id: Schema.Types.ObjectId,
    displayName: String,
    createdAt: { type: Date, default: Date.now },
}, { collection: 'categories' });
var CategoryModel = mongoose.model('CategoryModel', categorySchema);
module.exports = CategoryModel;
