const { Product, ProductModel } = require('./model');

const getAll = async () => {
  const products = await ProductModel.find({});
  return products;
};

const save = async (product: typeof Product) => {
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

module.exports = { getAll, save };
