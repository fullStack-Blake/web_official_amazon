const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;

// productId
