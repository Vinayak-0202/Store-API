const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "produt must have name"],
  },
  price: {
    type: Number,
    required: [true, "product must have number"],
  },
  featured: {
    type: String,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      meessage: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
