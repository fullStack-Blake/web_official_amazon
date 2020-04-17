const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  productPic: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

// productName
// price
// description
// category
// quantity
// bestSeller
// productPic
