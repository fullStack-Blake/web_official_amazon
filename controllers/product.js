const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const cartModel = require("../models/cart");
const path = require("path");
const isAuthenticated = require("../middleware/auth");
const staticModel = require("../models/staticProducts");

router.get("/", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.bestSeller == true)
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            bestSeller: product.bestSeller,
            productPic: product.productPic,
            discount: (product.price * 0.8).toFixed(2)
          };
        else {
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
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/shoes", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.category == "shoes")
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            category: product.category,
            bestSeller: product.bestSeller,
            productPic: product.productPic
          };
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/valentines", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.category == "valentines")
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            category: product.category,
            bestSeller: product.bestSeller,
            productPic: product.productPic
          };
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/electronics", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.category == "electronics")
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            category: product.category,
            bestSeller: product.bestSeller,
            productPic: product.productPic,
            discount: (product.price * 0.8).toFixed(2)
          };
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/airpodcase", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.category == "airpodcase")
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            category: product.category,
            bestSeller: product.bestSeller,
            productPic: product.productPic
          };
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/add", isAuthenticated, (req, res) => {
  console.log("Add product");
  res.render("productAddForm");
});

router.post("/add", isAuthenticated, (req, res) => {
  const newProduct = {
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    quantity: req.body.quantity,
    bestSeller: req.body.bestSeller,
    productPic: req.body.productPic
  };

  const product = new productModel(newProduct);
  product
    .save()
    .then(user => {
      req.files.productPic.name = `pro_pic_${product._id}${
        path.parse(req.files.productPic.name).ext
      }`;

      req.files.productPic
        .mv(`public/uploads/${req.files.productPic.name}`)
        .then(() => {
          productModel
            .updateOne(
              { _id: product._id },
              { productPic: req.files.productPic.name }
            )
            .then(() => {
              // Here
              res.redirect("/product/list");
            })
            .catch(err => {
              console.log(`Error when storing a path: ${err}`);
            });
        })
        .catch(err => console.log(`Error when inserting a file: ${err}`));
    })
    .catch(err =>
      console.log(
        `Error occured when inserting data into the product collection ${err}`
      )
    );
});

router.get("/list", isAuthenticated, (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
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
      });
      res.render("productBoard", {
        data: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.post("/search", (req, res) => {
  const searchBy = req.body.productSearch;

  if (searchBy == "all") res.redirect("/product");
  else if (searchBy == "Shoes") res.redirect("/product/shoes");
  else if (searchBy == "Valentines") res.redirect("/product/valentines");
  else if (searchBy == "Electronics") res.redirect("/product/electronics");
  else if (searchBy == "AirpodCase") res.redirect("/product/airpodcase");
});

router.post("/addcart", isAuthenticated, (req, res) => {
  const newCart = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  console.log(newCart.productId, newCart.quantity);
  const cart = new cartModel(newCart);
  cart
    .save()
    .then(() => {
      res.redirect("/product/cart");
    })
    .catch(err =>
      console.log(
        `Error occured when inserting data into the cart collection ${err}`
      )
    );
});

router.get("/cart", isAuthenticated, (req, res) => {
  cartModel
    .find()
    .then(carts => {
      const filteredCart = carts.map(cart => {
        productModel
          .findOne({ _id: cart.productId })
          .then(product => {
            return {
              id: product._id,
              productName: product.productName,
              price: product.price,
              category: product.category,
              bestSeller: product.bestSeller,
              productPic: product.productPic
            };
          })
          .catch(err => console.log(`Error when find product`));
      });
      console.log(filteredCart);
      res.render("cart", {
        title: "cart",
        heading: "mountains",
        carts: filteredCart
      });
    })
    .catch(err => console.log(`Error when find cart: ${err}`));
});

router.get("/edit/:id", (req, res) => {
  productModel
    .findById(req.params.id)
    .then(product => {
      const {
        _id,
        productName,
        price,
        description,
        category,
        quantity,
        bestSeller,
        productPic
      } = product;
      res.render("productEditForm", {
        _id,
        productName,
        price,
        description,
        category,
        quantity,
        bestSeller,
        productPic
      });
    })
    .catch(err => console.log(`Error when find by id: ${err}`));
});

router.get("/profile/:id", (req, res) => {
  console.log("Until Here");
  productModel.findById(req.params.id).then(product => {
    const {
      _id,
      productName,
      price,
      description,
      category,
      quantity,
      bestSeller,
      productPic
    } = product;
    res.render("productDetail", {
      _id,
      productName,
      price,
      description,
      category,
      quantity,
      bestSeller,
      productPic
    });
  });
});

router.put("/update/:id", (req, res) => {
  const product = {
    productName: product.productName,
    price: product.price,
    description: product.description,
    category: product.category,
    quantity: product.quantity,
    bestSeller: product.bestSeller,
    productPic: product.productPic
  };
  productModel
    .updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.redirect("/product/list");
    })
    .catch(err => console.log(`Error when updating: ${err}`));
});

router.delete("/delete/:id", (req, res) => {
  productModel
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/product/list");
    })
    .catch(err => console.log(`Error when deleting data: ${err}`));
});

module.exports = router;
