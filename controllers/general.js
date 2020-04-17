const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const path = require("path");
const isAuthenticated = require("../middleware/auth");
const staticModel = require("../models/staticProducts");

router.get("/", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.bestSeller == true) {
          console.log(product.productName);
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            bestSeller: product.bestSeller,
            productPic: product.productPic
          };
        }
      });
      res.render("home", {
        title: "Home",
        heading: "mountains",
        categories: staticModel.initC(),
        bestSellers: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

module.exports = router;
