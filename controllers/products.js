const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
    queryObject.company = company;
  }
  const products = await Product.find(queryObject);
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProductsStatic = async (req, res) => {
  const product = await Product.find({});
  res.status(200).json({ product, nbHits: product.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
