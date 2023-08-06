const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductsStatics,
} = require("../controllers/products");
const { get } = require("mongoose");

router.route("/").get(getAllProducts);
router.route("/statics").get(getAllProductsStatics);

module.exports = router;
