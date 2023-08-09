const { query } = require("express");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, name, company, sort, fields, numericFilter } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilter) {
    opratorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };
  }
  const regEx = /\b(<|>|>=|=|<|<=)\b/g;
  let filter = numericFilter.replace(
    regEx,
    (match) => `-${opratorMap[match]}-`
  );
  const option = ["price", "rating"];
  filter = filter.split(",").forEach((item) => {
    const [field, operator, value] = item.split("-");
    if (option.includes(field)) {
      queryObject[field] = { [operator]: Number(value) };
    }
  });
  console.log(queryObject);
  let results = Product.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results = results.sort("createdAt");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    results = results.select(fieldList);
  }

  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skip = (page - 1) * limit;

  results = results.skip(skip).limit(limit);
  const products = await results;
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProductsStatic = async (req, res) => {
  const product = await Product.find({ price: { $lt: 100 } }).sort("price");
  res.status(200).json({ product, nbHits: product.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
