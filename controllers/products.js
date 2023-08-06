const getAllProducts = (req, res) => {
  res.status(200).json({ msg: "Here is all your products" });
};

const getAllProductsStatics = (req, res) => {
  res.status(200).json({ msg: "here is Product statics" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatics,
};
